import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DemandeConge } from '../model/demande-conge.model';

export interface Notification {
  id: number;
  type: 'DEMANDE_CREEE' | 'DEMANDE_ACCEPTEE' | 'DEMANDE_REFUSEE';
  message: string;
  timestamp: Date;
  read: boolean;
  demandeId?: number;
  fromUser?: string;
  toUser?: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifications = new BehaviorSubject<Notification[]>([]);
  private unreadCount = new BehaviorSubject<number>(0);

  constructor() {
    // Charger les notifications depuis le localStorage au démarrage
    this.loadNotifications();
  }

  getNotifications(): Observable<Notification[]> {
    return this.notifications.asObservable();
  }

  getUnreadCount(): Observable<number> {
    return this.unreadCount.asObservable();
  }

  addNotification(notification: Omit<Notification, 'id' | 'timestamp' | 'read'>): void {
    const newNotification: Notification = {
      ...notification,
      id: Date.now(),
      timestamp: new Date(),
      read: false
    };

    const currentNotifications = this.notifications.value;
    const updatedNotifications = [newNotification, ...currentNotifications];
    
    this.notifications.next(updatedNotifications);
    this.updateUnreadCount();
    this.saveNotifications();
    
    // Jouer un son de notification
    this.playNotificationSound();
  }

  markAsRead(notificationId: number): void {
    const currentNotifications = this.notifications.value;
    const updatedNotifications = currentNotifications.map(notification =>
      notification.id === notificationId ? { ...notification, read: true } : notification
    );
    
    this.notifications.next(updatedNotifications);
    this.updateUnreadCount();
    this.saveNotifications();
  }

  markAllAsRead(): void {
    const currentNotifications = this.notifications.value;
    const updatedNotifications = currentNotifications.map(notification => ({
      ...notification,
      read: true
    }));
    
    this.notifications.next(updatedNotifications);
    this.updateUnreadCount();
    this.saveNotifications();
  }

  deleteNotification(notificationId: number): void {
    const currentNotifications = this.notifications.value;
    const updatedNotifications = currentNotifications.filter(
      notification => notification.id !== notificationId
    );
    
    this.notifications.next(updatedNotifications);
    this.updateUnreadCount();
    this.saveNotifications();
  }

  // Méthodes spécifiques pour les demandes de congé
  notifyDemandeCreated(demande: DemandeConge): void {
    this.addNotification({
      type: 'DEMANDE_CREEE',
      message: `Nouvelle demande de congé de ${demande.employeUsername} du ${demande.dateDebut} au ${demande.dateFin}`,
      demandeId: demande.id,
      fromUser: demande.employeUsername,
      toUser: 'RH'
    });
  }

  notifyDemandeAccepted(demande: DemandeConge): void {
    this.addNotification({
      type: 'DEMANDE_ACCEPTEE',
      message: `Votre demande de congé du ${demande.dateDebut} au ${demande.dateFin} a été acceptée`,
      demandeId: demande.id,
      fromUser: 'RH',
      toUser: demande.employeUsername
    });
  }

  notifyDemandeRefused(demande: DemandeConge): void {
    this.addNotification({
      type: 'DEMANDE_REFUSEE',
      message: `Votre demande de congé du ${demande.dateDebut} au ${demande.dateFin} a été refusée`,
      demandeId: demande.id,
      fromUser: 'RH',
      toUser: demande.employeUsername
    });
  }

  private updateUnreadCount(): void {
    const unreadCount = this.notifications.value.filter(n => !n.read).length;
    this.unreadCount.next(unreadCount);
  }

  private saveNotifications(): void {
    localStorage.setItem('notifications', JSON.stringify(this.notifications.value));
  }

  private loadNotifications(): void {
    const saved = localStorage.getItem('notifications');
    if (saved) {
      const notifications = JSON.parse(saved);
      this.notifications.next(notifications);
      this.updateUnreadCount();
    }
  }

  private playNotificationSound(): void {
    try {
      // Créer un son de notification simple
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.2);
    } catch (error) {
      console.log('Impossible de jouer le son de notification:', error);
    }
  }
} 