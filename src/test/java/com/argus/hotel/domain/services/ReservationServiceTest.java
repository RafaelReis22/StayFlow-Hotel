package com.argus.hotel.domain.services;

import com.argus.hotel.domain.entities.Reservation;
import com.argus.hotel.infra.repositories.ReservationRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ReservationServiceTest {

    @Mock
    private ReservationRepository repository;

    @InjectMocks
    private ReservationService service;

    private Reservation reservationWithValue;
    private Reservation reservationWithoutValue;

    @BeforeEach
    void setUp() {
        reservationWithValue = Reservation.builder()
                .id(1L)
                .checkInDate(LocalDate.of(2025, 12, 10))
                .checkOutDate(LocalDate.of(2025, 12, 15))
                .value(new BigDecimal("600.00"))
                .paymentMethod("Cartão de Crédito")
                .build();

        reservationWithoutValue = Reservation.builder()
                .checkInDate(LocalDate.of(2025, 12, 10))
                .checkOutDate(LocalDate.of(2025, 12, 15))
                .paymentMethod("PIX")
                .build();
    }

    @Test
    void saveShouldPersistReservationWithExplicitValue() {
        when(repository.save(reservationWithValue)).thenReturn(reservationWithValue);
        Reservation saved = service.save(reservationWithValue);
        assertThat(saved.getValue()).isEqualByComparingTo("600.00");
        verify(repository).save(reservationWithValue);
    }

    @Test
    void saveShouldAutoCalculateValueWhenNull() {
        when(repository.save(any())).thenAnswer(inv -> inv.getArgument(0));
        Reservation saved = service.save(reservationWithoutValue);
        // 5 days * R$150 = R$750
        assertThat(saved.getValue()).isEqualByComparingTo("750.00");
    }

    @Test
    void findAllShouldReturnAllReservations() {
        when(repository.findAll()).thenReturn(List.of(reservationWithValue));
        assertThat(service.findAll()).hasSize(1);
    }

    @Test
    void findByIdShouldReturnReservationWhenExists() {
        when(repository.findById(1L)).thenReturn(Optional.of(reservationWithValue));
        assertThat(service.findById(1L)).isPresent();
    }

    @Test
    void findByIdShouldReturnEmptyWhenNotFound() {
        when(repository.findById(99L)).thenReturn(Optional.empty());
        assertThat(service.findById(99L)).isEmpty();
    }

    @Test
    void deleteShouldCallRepository() {
        service.deleteById(1L);
        verify(repository).deleteById(1L);
    }
}
