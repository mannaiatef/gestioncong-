import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { NotificationService, Notification } from '../../service/notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notification-dropdown',
  templateUrl: './notification-dropdown.component.html',
  styleUrls: ['./notification-dropdown.component.css']
})
export class NotificationDropdownComponent implements OnInit, OnDestroy {
  notifications: Notification[] = [];
  filteredNotifications: Notification[] = [];
  unreadCount = 0;
  showDropdown = false;
  selectedFilter: 'all' | 'DEMANDE_CREEE' | 'DEMANDE_ACCEPTEE' | 'DEMANDE_REFUSEE' = 'all';
  private notificationsSubscription!: Subscription;
  private unreadCountSubscription!: Subscription;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationsSubscription = this.notificationService.getNotifications()
      .subscribe(notifications => {
        this.notifications = notifications;
        this.filterNotifications();
      });

    this.unreadCountSubscription = this.notificationService.getUnreadCount()
      .subscribe(count => {
        this.unreadCount = count;
      });
  }

  ngOnDestroy(): void {
    if (this.notificationsSubscription) {
      this.notificationsSubscription.unsubscribe();
    }
    if (this.unreadCountSubscription) {
      this.unreadCountSubscription.unsubscribe();
    }
  }

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
    if (this.showDropdown) {
      this.markAllAsRead();
    }
  }

  markAsRead(notification: Notification): void {
    this.notificationService.markAsRead(notification.id);
  }

  markAllAsRead(): void {
    this.notificationService.markAllAsRead();
  }

  deleteNotification(notificationId: number, event: Event): void {
    event.stopPropagation();
    this.notificationService.deleteNotification(notificationId);
  }

  getNotificationIcon(type: string): string {
    switch (type) {
      case 'DEMANDE_CREEE':
        return 'fas fa-plus-circle text-primary';
      case 'DEMANDE_ACCEPTEE':
        return 'fas fa-check-circle text-success';
      case 'DEMANDE_REFUSEE':
        return 'fas fa-times-circle text-danger';
      default:
        return 'fas fa-bell text-info';
    }
  }

  formatTime(timestamp: Date): string {
    const now = new Date();
    const diff = now.getTime() - new Date(timestamp).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'À l\'instant';
    if (minutes < 60) return `Il y a ${minutes} min`;
    if (hours < 24) return `Il y a ${hours}h`;
    if (days < 7) return `Il y a ${days}j`;
    return new Date(timestamp).toLocaleDateString('fr-FR');
  }

  filterNotifications(): void {
    if (this.selectedFilter === 'all') {
      this.filteredNotifications = this.notifications;
    } else {
      this.filteredNotifications = this.notifications.filter(
        notification => notification.type === this.selectedFilter
      );
    }
  }

  onFilterChange(): void {
    this.filterNotifications();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.notification-container')) {
      this.showDropdown = false;
    }
  }
} 