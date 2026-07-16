package com.example.backend.report;

import com.example.backend.dto.SummaryDTO;
import com.lowagie.text.Document;
import com.lowagie.text.Paragraph;
import com.lowagie.text.pdf.PdfWriter;
import org.springframework.stereotype.Component;

import java.io.ByteArrayOutputStream;

@Component
public class PdfReportGenerator {
    public byte[] generate(SummaryDTO summary) {

        try {

            ByteArrayOutputStream output = new ByteArrayOutputStream();

            Document document = new Document();

            PdfWriter.getInstance(document, output);

            document.open();

            document.add(new Paragraph("Booking Summary Report"));
            document.add(new Paragraph(" "));
            document.add(new Paragraph("Total Bookings : "
                    + summary.getTotalBookings()));

            document.add(new Paragraph("Confirmed : "
                    + summary.getConfirmed()));

            document.add(new Paragraph("Cancelled : "
                    + summary.getCancelled()));

            document.add(new Paragraph("Total Revenue : "
                    + summary.getTotalRevenue()));

            document.close();

            return output.toByteArray();

        } catch (Exception e) {

            throw new RuntimeException("Failed to generate PDF.");

        }

    }
}
