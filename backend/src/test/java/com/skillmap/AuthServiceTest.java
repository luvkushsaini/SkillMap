package com.skillmap;

import com.skillmap.dto.AuthRequest;
import com.skillmap.model.User;
import com.skillmap.repository.UserRepository;
import com.skillmap.security.JwtUtil;
import com.skillmap.service.AuthService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.Map;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtUtil jwtUtil;

    @Mock
    private AuthenticationManager authenticationManager;

    @InjectMocks
    private AuthService authService;

    @Test
    void shouldRegisterNewUser() {
        AuthRequest request = new AuthRequest();
        request.setName("John Doe");
        request.setEmail("john@example.com");
        request.setPassword("password123");

        when(userRepository.existsByEmail("john@example.com")).thenReturn(false);
        when(passwordEncoder.encode("password123")).thenReturn("hashed_password");
        when(userRepository.save(any(User.class))).thenAnswer(inv -> {
            User u = inv.getArgument(0);
            u.setId(1L);
            return u;
        });
        when(jwtUtil.generateToken("john@example.com")).thenReturn("mock.jwt.token");

        Map<String, Object> result = authService.register(request);

        assertNotNull(result.get("token"));
        assertEquals("mock.jwt.token", result.get("token"));
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    void shouldThrowWhenEmailAlreadyExists() {
        AuthRequest request = new AuthRequest();
        request.setEmail("existing@example.com");
        request.setPassword("password");

        when(userRepository.existsByEmail("existing@example.com")).thenReturn(true);

        assertThrows(RuntimeException.class, () -> authService.register(request));
    }
}
