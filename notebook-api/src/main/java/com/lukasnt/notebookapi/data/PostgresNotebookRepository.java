package com.lukasnt.notebookapi.data;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public class PostgresNotebookRepository implements NotebookRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<NotebookEntry> getAllNotebooks() {
        String sql = "SELECT * FROM notebooks";
        return jdbcTemplate.query(sql, PostgresNotebookRepository::notebookEntry);
    }

    @Override
    public NotebookEntry getNotebook(String notebookId) {
        String sql = "SELECT * FROM notebooks WHERE notebook_id = ?";
        var result = jdbcTemplate.query(sql, PostgresNotebookRepository::notebookEntry, UUID.fromString(notebookId));
        return !result.isEmpty() ? result.getFirst() : null;
    }

    @Override
    public List<CellEntry> getCells(String notebookId) {
        String sql = "SELECT * FROM cells WHERE notebook_id = ?";
        return jdbcTemplate.query(sql, PostgresNotebookRepository::cellEntry, UUID.fromString(notebookId));
    }

    @Override
    public List<FormulaEntry> getFormulas(String notebookId) {
        String sql = """
            SELECT *
            FROM formulas
            INNER JOIN (SELECT cell_id
                    FROM cells
                    WHERE cells.notebook_id = ?) AS cell_ids
                ON formulas.cell_id = cell_ids.cell_id;
            """;
        return jdbcTemplate.query(sql, PostgresNotebookRepository::formulaEntry, UUID.fromString(notebookId));
    }

    @Override
    public NotebookEntry insertNotebook(NotebookEntry notebook) {
        int id = jdbcTemplate.update("INSERT into notebooks (notebook_id, title, created, modified) VALUES (?, ?, ?, ?)",
            notebook.notebookId(),
            notebook.title(),
            notebook.created(),
            notebook.modified()
        );
        if (id > 0) {
            return notebook;
        }
        return null;
    }

    @Override
    public CellEntry insertCell(CellEntry cell) {
        int id = jdbcTemplate.update("INSERT into cells (cell_id, notebook_id, updated, textContent, evaluated) VALUES (?, ?, ?, ?, ?)",
            cell.cellId(),
            cell.notebookId(),
            cell.updated(),
            cell.textContent(),
            cell.evaluated()
        );
        if (id > 0) {
            return cell;
        }
        return null;
    }

    @Override
    public List<FormulaEntry> insertFormulas(List<FormulaEntry> formulas) {
        String sql = "INSERT INTO formulas (formulaId, cellId, operator, inputs, value, error) VALUES (?, ?, ?, ?, ?, ?)";
        jdbcTemplate.batchUpdate(sql, formulas, formulas.size(), (ps,formula) -> {
            ps.setString(1, String.valueOf(formula.formulaId()));
            ps.setString(2, String.valueOf(formula.cellId()));
            ps.setString(3, formula.operator());
            ps.setArray(4, ps.getConnection().createArrayOf("UUID", formula.inputs()));
            ps.setBigDecimal(5, formula.value());
            ps.setString(6, formula.error());
        });
        return formulas;
    }

    @Override
    public CellEntry replaceCell(CellEntry cell) {
        return null;
    }

    @Override
    public List<CellEntry> replaceCells(List<CellEntry> cells) {
        return List.of();
    }

    @Override
    public NotebookEntry deleteNotebook(NotebookEntry notebook) {
        return null;
    }

    @Override
    public NotebookEntry deleteCell(CellEntry cell) {
        return null;
    }

    static NotebookEntry notebookEntry(ResultSet rs, int rowNum) {
        try {
            return new NotebookEntry(
                rs.getInt("id"),
                toUUID(rs.getString("notebook_id")),
                rs.getString("title"),
                toZonedDateTime(rs.getTimestamp("created")),
                toZonedDateTime(rs.getTimestamp("modified"))
            );
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    static CellEntry cellEntry(ResultSet rs, int rowNum) {
        try {
            return new CellEntry(
                rs.getInt("id"),
                toUUID(rs.getString("cell_id")),
                toUUID(rs.getString("notebook_id")),
                rs.getString("symbol"),
                toZonedDateTime(rs.getTimestamp("updated")),
                rs.getString("text_content"),
                toUUID(rs.getString("formula")),
                rs.getBigDecimal("evaluated")
            );
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    static FormulaEntry formulaEntry(ResultSet rs, int rowNum) {
        try {
            return new FormulaEntry(
                rs.getInt("id"),
                toUUID(rs.getString("formula_id")),
                toUUID(rs.getString("cell_id")),
                rs.getString("operator"),
                (UUID[]) rs.getArray("inputs").getArray(),
                rs.getBigDecimal("value"),
                rs.getString("error")
            );
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    static ZonedDateTime toZonedDateTime(Timestamp sqlTimestamp) {
        return Optional.ofNullable(sqlTimestamp)
            .map(Timestamp::toInstant)
            .map(t -> t.atZone(ZoneId.systemDefault()))
            .orElse(null);
    }

    static UUID toUUID(String value) {
        return Optional.ofNullable(value)
            .map(UUID::fromString)
            .orElse(null);
    }

}
