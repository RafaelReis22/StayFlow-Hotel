package com.argus.hotel.domain.services;

import com.argus.hotel.domain.entities.Reservation;
import com.argus.hotel.infra.repositories.ReservationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReservationService {

    private final ReservationRepository repository;

    @Transactional(readOnly = true)
    public List<Reservation> findAll() {
        return repository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<Reservation> findById(Long id) {
        return repository.findById(id);
    }

    @Transactional
    public Reservation save(Reservation reservation) {
        // Lógica de Negócio: Auto-calcula o valor se não for fornecido (baseado em uma taxa padrão para demonstração)
        if (reservation.getValue() == null) {
            long days = ChronoUnit.DAYS.between(reservation.getCheckInDate(), reservation.getCheckOutDate());
            BigDecimal rate = new BigDecimal("150.00"); // Taxa padrão Especialista
            reservation.setValue(rate.multiply(new BigDecimal(days)));
        }
        return repository.save(reservation);
    }

    @Transactional
    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
