import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AddnewuserComponent } from './components/addnewuser/addnewuser.component';
import { SnippetComponent } from './components/snippet/snippet.component';
import { LanguageComponent } from './components/language/language.component';
import { TopicComponent } from './components/topic/topic.component';
import { FrameworkComponent } from './components/framework/framework.component';
import { SnippetInfoComponent } from './components/snippet-info/snippet-info.component';
import { LogoutComponent } from './components/logout/logout.component';
import { logInGuardGuard } from './guard/log-in-guard.guard';
//canActivate: [logInGuardGuard]
export const routes: Routes = [
  { path: '', component: SnippetInfoComponent, canActivate: [logInGuardGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'addnewuser', component: AddnewuserComponent, canActivate: [logInGuardGuard] },
  { path: 'snippet', component: SnippetComponent, canActivate: [logInGuardGuard] },
  { path: 'language', component: LanguageComponent, canActivate: [logInGuardGuard] },
  { path: 'topic', component: TopicComponent, canActivate: [logInGuardGuard] },
  { path: 'framework', component: FrameworkComponent, canActivate: [logInGuardGuard] },
  { path: 'snippet_info', component: SnippetInfoComponent, canActivate: [logInGuardGuard] },
  { path: 'logout', component: LogoutComponent, canActivate: [logInGuardGuard] },
];
