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
    public NotebookEntry getNotebook(String id) {
        String sql = "SELECT * FROM notebooks WHERE notebook_id = ?";
        var result = jdbcTemplate.query(sql, PostgresNotebookRepository::notebookEntry, Integer.parseInt(id));
        return !result.isEmpty() ? result.getFirst() : null;
    }

    @Override
    public List<CellEntry> getCells(String notebookId) {
        String sql = "SELECT * FROM cells WHERE notebook_id = ?";
        return jdbcTemplate.query(sql, PostgresNotebookRepository::cellEntry, Integer.parseInt(notebookId));
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
                String.valueOf(rs.getInt("notebook_id")),
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
                String.valueOf(rs.getInt("cell_id")),
                String.valueOf(rs.getInt("notebook_id")),
                rs.getString("symbol"),
                toZonedDateTime(rs.getTimestamp("updated")),
                rs.getString("text_content"),
                rs.getBigDecimal("evaluated")
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

}
