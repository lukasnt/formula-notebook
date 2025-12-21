package com.lukasnt.notebookapi;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.lukasnt.notebookapi.controllers.NotebookController;
import com.lukasnt.notebookapi.core.NotebookManager;
import com.lukasnt.notebookapi.data.NotebookRepository;
import com.lukasnt.notebookapi.data.PostgresNotebookRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.jackson.autoconfigure.JsonMapperBuilderCustomizer;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class NotebookApplication {

    static void main(String[] args) {
        SpringApplication.run(NotebookApplication.class, args);
    }

    @Bean NotebookRepository notebookRepository() {
        return new PostgresNotebookRepository();
    }

    @Bean
    public NotebookManager notebookManager(NotebookRepository notebookRepository) {
        return new NotebookManager(notebookRepository);
    }

    @Bean
    public NotebookController notebookController() {
        return new NotebookController();
    }

    @Bean
    public JsonMapperBuilderCustomizer jacksonCustomizer() {
        return builder -> builder
            .changeDefaultPropertyInclusion(incl ->
                incl.withValueInclusion(JsonInclude.Include.NON_NULL)
            );
    }

}
