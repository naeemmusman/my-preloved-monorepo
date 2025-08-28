import { inject } from '@angular/core';
import { forkJoin } from 'rxjs';
import { AuthService } from './modules/auth/services/auth.service';
import { MessagesService } from './layout/common/messages/messages.service';
import { NavigationService } from './core/navigation/navigation.service';
import { NotificationsService } from './layout/common/notifications/notifications.service';
import { QuickChatService } from './layout/common/quick-chat/quick-chat.service';
import { ShortcutsService } from './layout/common/shortcuts/shortcuts.service';

export const initialDataResolver = () => {
    const messagesService = inject(MessagesService);
    const navigationService = inject(NavigationService);
    const notificationsService = inject(NotificationsService);
    const quickChatService = inject(QuickChatService);
    const shortcutsService = inject(ShortcutsService);
    const authService = inject(AuthService);

    // Fork join multiple API endpoint calls to wait all of them to finish
    return forkJoin([
        navigationService.get(),
        messagesService.getAll(),
        notificationsService.getAll(),
        quickChatService.getChats(),
        shortcutsService.getAll(),
        authService.getProfile(),
    ]);
};
