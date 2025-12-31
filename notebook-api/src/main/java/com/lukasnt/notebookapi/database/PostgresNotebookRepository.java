package com.lukasnt.notebookapi.database;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

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
        var sql = "SELECT * FROM notebooks";
        return jdbcTemplate.query(sql, PostgresNotebookRepository::notebookEntry);
    }

    @Override
    public NotebookEntry getNotebook(String notebookId) {
        var sql = "SELECT * FROM notebooks WHERE notebook_id = ?";
        var result = jdbcTemplate.query(sql, PostgresNotebookRepository::notebookEntry, UUID.fromString(notebookId));
        return !result.isEmpty() ? result.getFirst() : null;
    }

    @Override
    public List<CellEntry> getCells(String notebookId) {
        var sql = "SELECT * FROM cells WHERE notebook_id = ?";
        return jdbcTemplate.query(sql, PostgresNotebookRepository::cellEntry, UUID.fromString(notebookId));
    }

    @Override
    public List<FormulaEntry> getFormulas(String notebookId) {
        var sql = """
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

    @Transactional
    @Override
    public CellEntry insertCell(CellEntry cell) {
        int id = jdbcTemplate.update("INSERT into cells (cell_id, notebook_id, updated, text_content, evaluated) VALUES (?, ?, ?, ?, ?)",
            cell.cellId(),
            cell.notebookId(),
            java.sql.Timestamp.from(cell.updated().toInstant()),
            cell.textContent(),
            cell.evaluated()
        );
        var updateSql = "UPDATE notebooks SET cell_count = cell_count + 1 WHERE notebook_id = ?";
        jdbcTemplate.update(updateSql, cell.notebookId());
        if (id > 0) {
            return cell;
        }
        return null;
    }

    @Transactional
    @Override
    public List<CellEntry> insertCells(String notebookId, List<CellEntry> cells) {
        var sql = "INSERT INTO cells (cell_id, notebook_id, symbol, updated, text_content, formula, evaluated) VALUES (?, ?, ?, ?, ?, ?, ?)";
        jdbcTemplate.batchUpdate(sql, cells, cells.size(), (ps,cell) -> {
            ps.setObject(1, cell.cellId());
            ps.setObject(2, cell.notebookId());
            ps.setString(3, cell.symbol());
            ps.setTimestamp(4, toSqlTimestamp(cell.updated()));
            ps.setString(5, cell.textContent());
            ps.setObject(6, cell.formula());
            ps.setBigDecimal(7, cell.evaluated());
        });
        var updateSql = "UPDATE notebooks SET cell_count = cell_count + ? WHERE notebook_id = ?";
        jdbcTemplate.update(updateSql, cells.size(), UUID.fromString(notebookId));
        return cells;
    }

    @Override
    public List<FormulaEntry> insertFormulas(List<FormulaEntry> formulas) {
        var sql = "INSERT INTO formulas (formula_id, cell_id, operator, inputs, value, error) VALUES (?, ?, ?, ?, ?, ?)";
        jdbcTemplate.batchUpdate(sql, formulas, formulas.size(), (ps,formula) -> {
            ps.setObject(1, formula.formulaId());
            ps.setObject(2, formula.cellId());
            ps.setString(3, formula.operator());
            ps.setArray(4, ps.getConnection().createArrayOf("UUID", formula.inputs()));
            ps.setBigDecimal(5, formula.value());
            ps.setString(6, formula.error());
        });
        return formulas;
    }

    @Transactional
    @Override
    public NotebookEntry replaceNotebook(NotebookEntry notebook) {
        var deleteSql = "DELETE FROM notebooks WHERE notebook_id = ?";
        jdbcTemplate.update(deleteSql, notebook.notebookId());
        var insertSql = "INSERT INTO notebooks (notebook_id, title, created, modified) VALUES (?, ?, ?, ?)";
        jdbcTemplate.update(insertSql,
            notebook.notebookId(),
            notebook.title(),
            toSqlTimestamp(notebook.created()),
            toSqlTimestamp(notebook.modified())
        );
        return notebook;
    }

    @Transactional
    @Override
    public CellEntry replaceCell(CellEntry cell) {
        var deleteSql = "DELETE FROM cells WHERE cell_id = ?";
        jdbcTemplate.update(deleteSql, cell.cellId());
        var insertSql = "INSERT into cells (cell_id, notebook_id, symbol, updated, text_content, formula, evaluated) VALUES (?, ?, ?, ?, ?, ?, ?)";
        jdbcTemplate.update(insertSql,
            cell.cellId(),
            cell.notebookId(),
            cell.symbol(),
            java.sql.Timestamp.from(cell.updated().toInstant()),
            cell.textContent(),
            cell.formula(),
            cell.evaluated()
        );
        return cell;
    }

    @Override
    public List<CellEntry> replaceCells(List<CellEntry> cells) {
        return List.of();
    }

    @Override
    public NotebookEntry deleteNotebook(NotebookEntry notebook) {
        return null;
    }

    @Transactional
    @Override
    public NotebookEntry deleteCell(CellEntry cell) {
        var deleteSql = "DELETE FROM cells WHERE cell_id = ?";
        jdbcTemplate.update(deleteSql, cell.cellId());
        var updateSql = "UPDATE notebooks SET modified = now(), cell_count = cell_count - 1 WHERE notebook_id = ?";
        jdbcTemplate.update(updateSql, cell.notebookId());
        return this.getNotebook(String.valueOf(cell.notebookId()));
    }

    static NotebookEntry notebookEntry(ResultSet rs, int rowNum) {
        try {
            return new NotebookEntry(
                rs.getInt("id"),
                toUUID(rs.getString("notebook_id")),
                rs.getString("title"),
                toZonedDateTime(rs.getTimestamp("created")),
                toZonedDateTime(rs.getTimestamp("modified")),
                rs.getInt("cell_count")
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

    static java.sql.Timestamp toSqlTimestamp(ZonedDateTime zonedDateTime) {
        return java.sql.Timestamp.from(zonedDateTime.toInstant());
    }

    static UUID toUUID(String value) {
        return Optional.ofNullable(value)
            .map(UUID::fromString)
            .orElse(null);
    }

}
