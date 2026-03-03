package com.lukasnt.notebookapi;

import com.lukasnt.notebookapi.config.FlywayConfig;
import com.lukasnt.notebookapi.database.NotebookRepository;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.bean.override.mockito.MockitoBean;

@SpringBootTest
class NotebookApplicationTests {

    @MockitoBean
    FlywayConfig flywayConfig;

    @Test
    void contextLoads() {
    }

}
