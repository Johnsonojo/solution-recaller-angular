import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { OpenaiService } from 'src/app/services/openai/openai.service';

@Component({
  selector: 'app-chat-ai',
  templateUrl: './chat-ai.component.html',
  styleUrls: ['./chat-ai.component.scss'],
})
export class ChatAiComponent implements OnInit {
  chatForm = this.fb.group({
    message: ['', [Validators.required]],
  });

  messages: any = [];
  isLoading = false;
  chatAnswer = '';
  errorMessage = '';
  userDetails!: any;
  showRegenerateBtn = false;

  constructor(
    private fb: FormBuilder,
    private openaiService: OpenaiService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userDetails = this.authService.getUserDetails() || '';
  }

  get formControls() {
    return this.chatForm.controls;
  }

  onGetChatConversation() {
    this.isLoading = true;
    this.messages.push({
      role: 'user',
      content: this.chatForm.value.message,
    });

    // set the form value to local storage
    localStorage.setItem('chatFormValue', JSON.stringify(this.chatForm.value));

    this.openaiService.getChatCompletion(this.chatForm.value).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        // clear the form
        this.chatForm.reset();
        this.messages = [...this.messages, res.answer];
        this.showRegenerateBtn = true;
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error.message;
      },
    });
  }

  onRegenerateChatConversation() {
    this.isLoading = true;
    this.showRegenerateBtn = false;
    // remove the last ai message
    this.messages.pop();

    // get the form value from local storage
    const chatFormValue = JSON.parse(
      localStorage.getItem('chatFormValue') || '{}'
    );
    this.openaiService.getChatCompletion(chatFormValue).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.messages = [...this.messages, res.answer];
        this.showRegenerateBtn = true;
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error.message;
      },
    });
  }
}
