import { inject, Injectable } from '@angular/core';
import { ChatMockApi } from '@mocks/apps/chat/api';
import { ContactsMockApi } from '@mocks/apps/contacts/api';
import { ECommerceInventoryMockApi } from '@mocks/apps/ecommerce/inventory/api';
import { FileManagerMockApi } from '@mocks/apps/file-manager/api';
import { HelpCenterMockApi } from '@mocks/apps/help-center/api';
import { MailboxMockApi } from '@mocks/apps/mailbox/api';
import { NotesMockApi } from '@mocks/apps/notes/api';
import { ScrumboardMockApi } from '@mocks/apps/scrumboard/api';
import { TasksMockApi } from '@mocks/apps/tasks/api';
import { AuthMockApi } from '@mocks/common/auth/api';
import { MessagesMockApi } from '@mocks/common/messages/api';
import { NavigationMockApi } from '@mocks/common/navigation/api';
import { NotificationsMockApi } from '@mocks/common/notifications/api';
import { SearchMockApi } from '@mocks/common/search/api';
import { ShortcutsMockApi } from '@mocks/common/shortcuts/api';
import { UserMockApi } from '@mocks/common/user/api';
import { AnalyticsMockApi } from '@mocks/dashboards/analytics/api';
import { CryptoMockApi } from '@mocks/dashboards/crypto/api';
import { FinanceMockApi } from '@mocks/dashboards/finance/api';
import { ProjectMockApi } from '@mocks/dashboards/project/api';
import { ActivitiesMockApi } from '@mocks/pages/activities/api';
import { IconsMockApi } from '@mocks/ui/icons/api';
import { AcademyMockApi } from './apps/academy/api';


@Injectable({ providedIn: 'root' })
export class MockApiService {
    academyMockApi = inject(AcademyMockApi);
    activitiesMockApi = inject(ActivitiesMockApi);
    analyticsMockApi = inject(AnalyticsMockApi);
    authMockApi = inject(AuthMockApi);
    chatMockApi = inject(ChatMockApi);
    contactsMockApi = inject(ContactsMockApi);
    cryptoMockApi = inject(CryptoMockApi);
    eCommerceInventoryMockApi = inject(ECommerceInventoryMockApi);
    fileManagerMockApi = inject(FileManagerMockApi);
    financeMockApi = inject(FinanceMockApi);
    helpCenterMockApi = inject(HelpCenterMockApi);
    iconsMockApi = inject(IconsMockApi);
    mailboxMockApi = inject(MailboxMockApi);
    messagesMockApi = inject(MessagesMockApi);
    navigationMockApi = inject(NavigationMockApi);
    notesMockApi = inject(NotesMockApi);
    notificationsMockApi = inject(NotificationsMockApi);
    projectMockApi = inject(ProjectMockApi);
    searchMockApi = inject(SearchMockApi);
    scrumboardMockApi = inject(ScrumboardMockApi);
    shortcutsMockApi = inject(ShortcutsMockApi);
    tasksMockApi = inject(TasksMockApi);
    userMockApi = inject(UserMockApi);
}
