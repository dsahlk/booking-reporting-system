package com.example.backend.service.impl;

import com.example.backend.dto.UploadResult;
import com.example.backend.dto.ValidationError;
import com.example.backend.entity.*;
import com.example.backend.repository.AgentRepository;
import com.example.backend.repository.BookingRepository;
import com.example.backend.repository.CountryRepository;
import com.example.backend.repository.TourTypeRepository;
import com.example.backend.service.BookingService;
import com.example.backend.util.CSVReaderUtil;
import com.example.backend.validation.BookingValidator;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BookingServiceImpl implements BookingService {

    private static final Logger logger = LoggerFactory.getLogger(BookingServiceImpl.class);

    private final BookingRepository bookingRepository;
    private final AgentRepository agentRepository;
    private final CountryRepository countryRepository;
    private final TourTypeRepository tourTypeRepository;

    public BookingServiceImpl(
            BookingRepository bookingRepository,
            AgentRepository agentRepository,
            CountryRepository countryRepository,
            TourTypeRepository tourTypeRepository
    ) {

        this.bookingRepository = bookingRepository;
        this.agentRepository = agentRepository;
        this.countryRepository = countryRepository;
        this.tourTypeRepository = tourTypeRepository;

    }

    @Override
    public UploadResult uploadBookings(MultipartFile file) {

        try {
            logger.info("CSV Upload process initiated for file: {}", file.getOriginalFilename());
            int success = 0;
            int failed = 0;
            int rowNumber = 1;

            List<String[]> rows = CSVReaderUtil.readCSV(file);
            List<ValidationError> errors = new ArrayList<>();

            if (file.getOriginalFilename() == null || !file.getOriginalFilename().endsWith(".csv")) {
                logger.warn("Upload rejected: File is not a CSV.");
                throw new RuntimeException("Only CSV files are allowed.");
            }

            //  check if the file is empty
            if (file.isEmpty()) {
                logger.warn("Upload rejected: File is empty.");
                throw new RuntimeException("File is empty.");
            }

            //loop through rows
            for(String[] row : rows){

                //skip malform row
                if(row.length != 7){
                    failed++;
                    logger.warn("Skipping row {}: Invalid column count (Expected 7, got {})", rowNumber, row.length);
                    errors.add(new ValidationError(rowNumber, "Row does not have exactly 7 columns"));
                    rowNumber++;
                    continue;

                }
                //skip null booking number
                if(BookingValidator.isEmpty(row[0])){
                    failed++;
                    logger.warn("Skipping row {}: does not have booking number '{}' detected", rowNumber, row[0]);
                    errors.add(new ValidationError(rowNumber, "Row does not have booking number columns"));
                    rowNumber++;
                    continue;

                }
                //skip dublicate booking
                if(bookingRepository.existsByBookingNo(row[0])){
                    failed++;
                    logger.warn("Skipping row {}: Duplicate booking number '{}' detected", rowNumber, row[0]);
                    errors.add(new ValidationError(rowNumber, "Row id has already exit."));
                    rowNumber++;
                    continue;

                }
                //skip amount is negative
                BigDecimal amount = new BigDecimal(row[5]);
                if(BookingValidator.isNegativeAmount(amount)){
                    failed++;
                    errors.add(new ValidationError(rowNumber, "Amount should be positive."));
                    rowNumber++;
                    continue;

                }

                BookingStatus status = BookingStatus.valueOf(row[6].toUpperCase());

                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("M/d/yyyy");
                LocalDate date = LocalDate.parse(row[4],formatter);
                logger.warn("date {}: Duplicate booking number '{}' detected", date, row[4]);

                //agent creation
                Optional<Agent> optionalAgent = agentRepository.findByName(row[1]);
                Agent agent;

                if(optionalAgent.isPresent()){
                    agent = optionalAgent.get();
                }else{
                    agent = Agent.builder()
                            .name(row[1])
                            .build();

                    agentRepository.save(agent);
                }

                //create country
                Country country = countryRepository.findByName(row[2])
                        .orElseGet(()->
                                countryRepository.save(
                                        Country.builder()
                                                .name(row[2])
                                                .build())
                        );

                //create tour type
                TourType tourType = tourTypeRepository.findByName(row[3])
                                .orElseGet(() ->

                                        tourTypeRepository.save(
                                                TourType.builder()
                                                        .name(row[3])
                                                        .build()

                                        )

                                );
                //save booking
                Booking booking = Booking.builder()

                        .bookingNo(row[0])

                        .bookingDate(date)

                        .amount(amount)

                        .status(status)

                        .agent(agent)

                        .country(country)

                        .tourType(tourType)

                        .build();

                bookingRepository.save(booking);
                success++;
                logger.info("Successfully processed and saved booking number: {}", booking.getBookingNo());
            }
          return UploadResult.builder()
                  .totalRows(rows.size())
                  .successRows(success)
                  .failedRows(failed)
                  .errors(errors)
                  .build();
        }
        catch (Exception e){
            logger.error("Critical failure during CSV processing", e);
            throw new RuntimeException(e);

        }


    }
}
