package com.argus.hotel.domain.entities;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "reservas")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "data_entrada", nullable = false)
    private LocalDate checkInDate;

    @Column(name = "data_saida", nullable = false)
    private LocalDate checkOutDate;

    @Column(name = "valor", nullable = false, precision = 12, scale = 2)
    private BigDecimal value;

    @Column(name = "forma_pagamento", nullable = false, length = 50)
    private String paymentMethod;
}
