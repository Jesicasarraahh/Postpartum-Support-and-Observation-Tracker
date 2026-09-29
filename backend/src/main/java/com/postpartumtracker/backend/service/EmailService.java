package com.postpartumtracker.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${app.frontend-url}")
    private String frontendUrl;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendVerificationEmail(
            String email,
            String firstName,
            String token) {

        String verificationLink = frontendUrl
                + "/verify-email?token="
                + token;

        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(email);

        message.setSubject(
                "Verify your Postpartum Support Tracker account");

        message.setText(
                "Hi " + firstName + ",\n\n"
                        + "Thank you for creating an account with "
                        + "Postpartum Support & Observation Tracker.\n\n"
                        + "Please verify your email by opening this link:\n\n"
                        + verificationLink
                        + "\n\n"
                        + "This verification link will expire in 24 hours.\n\n"
                        + "If you did not create this account, "
                        + "you can ignore this email.");

        mailSender.send(message);
    }

    public void sendPasswordResetEmail(
            String email,
            String firstName,
            String token) {

        String resetLink = frontendUrl
                + "/reset-password?token="
                + token;

        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(email);

        message.setSubject(
                "Reset your Postpartum Support Tracker password");

        message.setText(
                "Hi " + firstName + ",\n\n"
                        + "We received a request to reset your password.\n\n"
                        + "Use this link to create a new password:\n\n"
                        + resetLink
                        + "\n\n"
                        + "This link will expire in 1 hour.\n\n"
                        + "If you did not request a password reset, "
                        + "you can ignore this email.");

        mailSender.send(message);
    }

    public void sendTrustedCircleInviteEmail(
            String email,
            String name,
            String token) {

        String inviteLink = frontendUrl
                + "/trusted-access?token="
                + token;

        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(email);

        message.setSubject(
                "You've been invited to a Postpartum Support Circle");

        message.setText(
                "Hi " + name + ",\n\n"
                        + "You have been invited to join a trusted "
                        + "postpartum support circle.\n\n"
                        + "You can use the link below to submit "
                        + "observations:\n\n"
                        + inviteLink
                        + "\n\n"
                        + "This link will expire in 7 days.\n\n"
                        + "Please only record things you personally observed.");

        mailSender.send(message);
    }

}