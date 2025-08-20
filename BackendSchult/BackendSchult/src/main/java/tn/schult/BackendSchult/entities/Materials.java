package tn.schult.BackendSchult.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter

@AllArgsConstructor
public class Materials {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Le nom ne peut pas être vide")
    @Size(max = 100, message = "Le nom ne peut pas dépasser 100 caractères")
    private String name;

    @NotNull(message = "La quantité ne peut pas être nulle")
    @PositiveOrZero(message = "La quantité doit être positive ou nulle")
    private int quantity;

    @NotNull(message = "Le prix unitaire ne peut pas être nul")
    @Positive(message = "Le prix unitaire doit être positif")
    private double unitPrice;

    @NotNull(message = "La catégorie ne peut pas être nulle")
    @Enumerated(EnumType.STRING)
    private Categorie categorie;

    @OneToMany(mappedBy = "materiel", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("materiel") // Ignore le champ materiel dans la sérialisation
    private List<Stock> stockList;


    public Materials() {
    }

    public Materials(String name, int quantity, double unitPrice, Categorie categorie, List<Stock> stockList) {
        this.name = name;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
        this.categorie = categorie;
        this.stockList = stockList;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(double unitPrice) {
        this.unitPrice = unitPrice;
    }

    public Categorie getCategorie() {
        return categorie;
    } public void setCategorie(Categorie categorie) {
        this.categorie = categorie;
    }

    public List<Stock> getStockList() {
        return stockList;
    }

    public void setStockList(List<Stock> stockList) {
        this.stockList = stockList;
    }
}
