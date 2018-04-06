import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';
import { FormsModule }    from '@angular/forms';

import { AppComponent } from './app.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { UserSelectComponent } from './user-select/user-select.component';
import { ChatMessagesComponent } from './chat-messages/chat-messages.component';

import { ChatService } from './chat.service';


@NgModule({
  declarations: [
    AppComponent,
    UserInfoComponent,
    UserSelectComponent,
    ChatMessagesComponent
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    BrowserModule
  ],
  providers: [ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
