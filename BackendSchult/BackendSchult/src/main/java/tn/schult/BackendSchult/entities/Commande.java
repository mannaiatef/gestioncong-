package tn.schult.BackendSchult.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter

@AllArgsConstructor
public class Commande {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private Date date;

    private String status;

    private double totalAmount;
    @ManyToOne
    @JoinColumn(name = "fournisseur_id")
    private Fournisseur fournisseur;
    @JsonIgnore
    @OneToMany(mappedBy = "commande", cascade = CascadeType.ALL)
    private List<Facture> factures;

    public Commande() {
    }

  public Commande(int id, Date date, String status, double totalAmount, Fournisseur fournisseur) {
    this.id = id;
    this.date = date;
    this.status = status;
    this.totalAmount = totalAmount;
    this.fournisseur = fournisseur;
  }

  public Commande(int id, Date date, String status, double totalAmount) {
    this.id = id;
    this.date = date;
    this.status = status;
    this.totalAmount = totalAmount;
  }

  public Commande(Date date, String status, double totalAmount) {
    this.date = date;
    this.status = status;
    this.totalAmount = totalAmount;
  }

  public Commande(Date date, String status, double totalAmount, Fournisseur fournisseur, List<Facture> factures) {
        this.date = date;
        this.status = status;
        this.totalAmount = totalAmount;
        this.fournisseur = fournisseur;
        this.factures = factures;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public Fournisseur getFournisseur() {
        return fournisseur;
    }

    public void setFournisseur(Fournisseur fournisseur) {
        this.fournisseur = fournisseur;
    }

    public List<Facture> getFactures() {
        return factures;
    }

    public void setFactures(List<Facture> factures) {
        this.factures = factures;
    }
}
