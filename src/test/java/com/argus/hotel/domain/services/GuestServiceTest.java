package com.argus.hotel.domain.services;

import com.argus.hotel.domain.entities.Guest;
import com.argus.hotel.infra.repositories.GuestRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class GuestServiceTest {

    @Mock
    private GuestRepository repository;

    @InjectMocks
    private GuestService service;

    private Guest validGuest;

    @BeforeEach
    void setUp() {
        validGuest = Guest.builder()
                .id(1L)
                .nome("Rafael")
                .sobrenome("Reis")
                .birthDate(LocalDate.now().minusYears(25))
                .nacionalidade("Brasileiro")
                .telefone("11999999999")
                .build();
    }

    @Test
    void saveShouldPersistGuestWithValidAge() {
        when(repository.save(validGuest)).thenReturn(validGuest);
        Guest saved = service.save(validGuest);
        assertThat(saved).isEqualTo(validGuest);
        verify(repository).save(validGuest);
    }

    @Test
    void saveShouldThrowWhenGuestUnder21() {
        Guest underageGuest = Guest.builder()
                .nome("Jovem")
                .sobrenome("Silva")
                .birthDate(LocalDate.now().minusYears(18))
                .nacionalidade("Brasileiro")
                .telefone("11988888888")
                .build();

        assertThatThrownBy(() -> service.save(underageGuest))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("21");
    }

    @Test
    void findAllShouldReturnAllGuests() {
        when(repository.findAll()).thenReturn(List.of(validGuest));
        assertThat(service.findAll()).hasSize(1).contains(validGuest);
    }

    @Test
    void findByIdShouldReturnGuestWhenExists() {
        when(repository.findById(1L)).thenReturn(Optional.of(validGuest));
        assertThat(service.findById(1L)).isPresent().contains(validGuest);
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
