package com.revature.models.DTOs;

public class ReimbursementDTO {
    private String description;
    private double amount;

    public ReimbursementDTO() {
    }

    public ReimbursementDTO(String description, double amount) {
        this.description = description;
        this.amount = amount;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    @Override
    public String toString() {
        return "IncomingReimDTO{" +
                "description='" + description + '\'' +
                ", amount=" + amount +
                '}';
    }
}
