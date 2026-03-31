package com.argus.hotel.domain.entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "hospedes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Guest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 25)
    private String nome;

    @Column(nullable = false, length = 50)
    private String sobrenome;

    @Column(name = "data_nasc", nullable = false)
    private LocalDate birthDate;

    @Column(nullable = false, length = 25)
    private String nacionalidade;

    @Column(nullable = false, length = 25)
    private String telefone;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_reserva")
    private Reservation reservation;
}
