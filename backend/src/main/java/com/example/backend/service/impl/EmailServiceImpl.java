package com.example.backend.service.impl;

import com.example.backend.dto.EmailRequest;
import com.example.backend.dto.SummaryDTO;
import com.example.backend.report.PdfReportGenerator;
import com.example.backend.service.DashboardService;
import com.example.backend.service.EmailService;
import jakarta.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService {
    private static final Logger logger =
            LoggerFactory.getLogger(EmailServiceImpl.class);

    private final JavaMailSender mailSender;
    private final DashboardService dashboardService;
    private final PdfReportGenerator pdfReportGenerator;

    EmailServiceImpl(JavaMailSender mailSender,
                     DashboardService dashboardService,
                     PdfReportGenerator generator) {
        this.mailSender = mailSender;
        this.dashboardService = dashboardService;
        this.pdfReportGenerator = generator;
    }

    @Override
    public void sendReport(EmailRequest request) {

        try {

            logger.info("Generating booking report...");

            SummaryDTO summary = dashboardService.summary();

            byte[] pdf = pdfReportGenerator.generate(summary);

            MimeMessage message = mailSender.createMimeMessage();

            MimeMessageHelper helper =
                    new MimeMessageHelper(message, true);

            helper.setTo(request.getTo());

            helper.setSubject("Booking Reporting System");

            helper.setText("""
                    Hello,

                    Please find the attached Booking Summary Report.

                    Regards,
                    Booking Reporting System
                    """);

            helper.addAttachment(
                    "booking-report.pdf",
                    new ByteArrayResource(pdf)
            );

            mailSender.send(message);

            logger.info("Email sent successfully.");

        } catch (Exception e) {

            logger.error("Email sending failed", e);

            throw new RuntimeException("Unable to send email.");

        }

    }
}
