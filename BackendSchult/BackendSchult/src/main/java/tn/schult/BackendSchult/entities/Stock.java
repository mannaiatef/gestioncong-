package tn.schult.BackendSchult.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter

@AllArgsConstructor
public class Stock {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "materiel_id")
    @JsonIgnoreProperties("stockList")
    private Materials materiel;

    private int currentQuantity;

    private int threshold;

    public Stock() {
    }

    public Stock(Materials materiel, int currentQuantity, int threshold) {
        this.materiel = materiel;
        this.currentQuantity = currentQuantity;
        this.threshold = threshold;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Materials getMateriel() {
        return materiel;
    }

    public void setMateriel(Materials materiel) {
        this.materiel = materiel;
    }

    public int getCurrentQuantity() {
        return currentQuantity;
    }

    public void setCurrentQuantity(int currentQuantity) {
        this.currentQuantity = currentQuantity;
    }

    public int getThreshold() {
        return threshold;
    }

    public void setThreshold(int threshold) {
        this.threshold = threshold;
    }
}
