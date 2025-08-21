# Composant de Profil Utilisateur - BackSchult

## Vue d'ensemble

Le composant de profil utilisateur permet aux utilisateurs de consulter et modifier leurs informations personnelles, changer leur mot de passe et gérer leur compte.

## Fonctionnalités

### 👤 Informations personnelles
- **Affichage du profil** : Nom d'utilisateur, email, rôle, statut
- **Modification des données** : Interface d'édition en ligne
- **Validation des champs** : Vérification des formats email et longueur des champs
- **Sauvegarde automatique** : Mise à jour en temps réel

### 🔐 Sécurité
- **Changement de mot de passe** : Interface sécurisée
- **Validation des mots de passe** : Confirmation et règles de sécurité
- **Mot de passe actuel requis** : Sécurité renforcée

### 🎨 Interface utilisateur
- **Design moderne** : Interface claire et intuitive
- **Responsive** : Adaptation mobile et desktop
- **Animations** : Transitions fluides
- **Messages de feedback** : Notifications de succès/erreur

## Architecture

### Composants
- **UserProfileComponent** : Composant principal
- **Formulaires réactifs** : Angular Reactive Forms
- **Validation** : Validateurs personnalisés

### Services
- **UserProfileService** : Gestion des opérations de profil
- **TokenStorageService** : Gestion des données utilisateur
- **AuthService** : Authentification et déconnexion

### Modèles
- **User** : Interface TypeScript pour les données utilisateur
- **Formulaires** : FormGroup pour la validation

## Utilisation

### Accès au profil
1. Se connecter à l'application
2. Cliquer sur l'avatar utilisateur en haut à droite
3. Sélectionner "Mon Profil" dans le dropdown

### Modification des informations
1. Cliquer sur "Modifier" dans la section "Informations personnelles"
2. Modifier les champs souhaités
3. Cliquer sur "Enregistrer" pour sauvegarder
4. Ou "Annuler" pour abandonner les modifications

### Changement de mot de passe
1. Cliquer sur "Changer le mot de passe" dans la section "Sécurité"
2. Saisir le mot de passe actuel
3. Saisir le nouveau mot de passe (minimum 6 caractères)
4. Confirmer le nouveau mot de passe
5. Cliquer sur "Changer le mot de passe"

## Validation des formulaires

### Informations personnelles
- **Nom d'utilisateur** : Requis, minimum 3 caractères
- **Email** : Requis, format email valide
- **Prénom/Nom** : Optionnels

### Mot de passe
- **Mot de passe actuel** : Requis
- **Nouveau mot de passe** : Requis, minimum 6 caractères
- **Confirmation** : Doit correspondre au nouveau mot de passe

## Messages et notifications

### Types de messages
- **Succès** : Opération réussie (vert)
- **Erreur** : Problème lors de l'opération (rouge)
- **Info** : Information générale (bleu)

### Durée d'affichage
- Messages automatiquement masqués après 3 secondes
- Possibilité de fermer manuellement

## Sécurité

### Protection des données
- Validation côté client et serveur
- Chiffrement des mots de passe
- Sessions sécurisées
- Protection CSRF

### Bonnes pratiques
- Mot de passe fort requis
- Validation des entrées utilisateur
- Gestion des erreurs sécurisée
- Logs d'audit

## Personnalisation

### Styles CSS
Les styles peuvent être modifiés dans :
- `user-profile.component.css`
- Variables CSS personnalisables
- Thèmes adaptatifs

### Configuration
- URL de l'API configurable
- Messages personnalisables
- Validation personnalisable

## Intégration API

### Endpoints requis
```typescript
// Récupérer le profil
GET /api/v1/profile

// Mettre à jour le profil
PUT /api/v1/profile

// Changer le mot de passe
POST /api/v1/change-password

// Uploader un avatar
POST /api/v1/upload-avatar
```

### Format des données
```typescript
interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  is_active: boolean;
  firstName?: string;
  lastName?: string;
}
```

## Responsive Design

### Breakpoints
- **Desktop** : > 768px
- **Tablet** : 480px - 768px
- **Mobile** : < 480px

### Adaptations
- Grille flexible
- Boutons adaptatifs
- Navigation optimisée
- Formulaires mobiles

## Tests

### Tests unitaires
- Validation des formulaires
- Gestion des erreurs
- Navigation
- Services

### Tests d'intégration
- Flux complet de modification
- Changement de mot de passe
- Gestion des sessions

## Dépendances

- Angular 12+
- Angular Reactive Forms
- Font Awesome (icônes)
- HttpClient (API calls)

## Support navigateur

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Maintenance

### Mises à jour
- Vérification des dépendances
- Tests de régression
- Documentation mise à jour

### Monitoring
- Logs d'erreur
- Métriques de performance
- Utilisation des fonctionnalités 