package com.argus.hotel;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

@SpringBootApplication
@EnableAspectJAutoProxy
public class StayFlowApplication {
    public static void main(String[] args) {
        SpringApplication.run(StayFlowApplication.class, args);
    }
}
