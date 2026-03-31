package com.argus.hotel.domain.services;

import com.argus.hotel.domain.entities.Guest;
import com.argus.hotel.infra.repositories.GuestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GuestService {

    private final GuestRepository repository;

    @Transactional(readOnly = true)
    public List<Guest> findAll() {
        return repository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<Guest> findById(Long id) {
        return repository.findById(id);
    }

    @Transactional
    public Guest save(Guest guest) {
        // Validação Especialista: Idade mínima de 21 anos (vinda da lógica original do projeto)
        int age = Period.between(guest.getBirthDate(), LocalDate.now()).getYears();
        if (age < 21) {
            throw new IllegalArgumentException("Hóspedes devem ter pelo menos 21 anos.");
        }
        return repository.save(guest);
    }

    @Transactional
    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
