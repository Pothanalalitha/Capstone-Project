package com.example.wipro.lalitha.service;

import java.util.List;

import com.example.wipro.lalitha.dto.InvoiceDTO;

public interface BillingService {
    void processAppointmentEvent(InvoiceDTO invoiceDTO);
    InvoiceDTO createInvoice(InvoiceDTO invoiceDTO);
    List<InvoiceDTO> getAllInvoices();
}
