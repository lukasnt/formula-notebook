package com.lukasnt.notebookapi.controllers;

import com.lukasnt.notebookapi.database.NotebookRepository;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(OperatorController.class)
public class OperatorControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private NotebookRepository notebookRepository;

    @Test
    public void test() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/operators")
            .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$").value(Matchers.hasSize(15)))
                .andExpect(jsonPath("$[0].id").value("PLUS"));
    }

}
