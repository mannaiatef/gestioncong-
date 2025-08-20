package tn.schult.BackendSchult.entities;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class DemandeCongeDTO {
    private Long id;
    private LocalDate dateDebut;
    private LocalDate dateFin;
    private String motif;
    private StatusDemande status;
    private LocalDateTime dateDemande;
    private String employeUsername;
    private String chefUsername;

    // Getters et setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public LocalDate getDateDebut() { return dateDebut; }
    public void setDateDebut(LocalDate dateDebut) { this.dateDebut = dateDebut; }
    public LocalDate getDateFin() { return dateFin; }
    public void setDateFin(LocalDate dateFin) { this.dateFin = dateFin; }
    public String getMotif() { return motif; }
    public void setMotif(String motif) { this.motif = motif; }
    public StatusDemande getStatus() { return status; }
    public void setStatus(StatusDemande status) { this.status = status; }
    public LocalDateTime getDateDemande() { return dateDemande; }
    public void setDateDemande(LocalDateTime dateDemande) { this.dateDemande = dateDemande; }
    public String getEmployeUsername() { return employeUsername; }
    public void setEmployeUsername(String employeUsername) { this.employeUsername = employeUsername; }
    public String getChefUsername() { return chefUsername; }
    public void setChefUsername(String chefUsername) { this.chefUsername = chefUsername; }
}
