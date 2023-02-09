import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
  isLoaded = false;
  chatAnswer = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private openaiService: OpenaiService) {}

  ngOnInit(): void {}

  get formControls() {
    return this.chatForm.controls;
  }

  onGetCompletion() {
    this.messages.push({
      sender: 'user',
      content: this.chatForm.value.message,
    });

    this.isLoaded = true;

    const lastApiMessage = this.messages
      .filter((message: any) => message.sender === 'api')
      .pop();

    const lastApiMessageContent = lastApiMessage ? lastApiMessage.content : '';

    const conversationData = {
      api: lastApiMessageContent,
      user: this.chatForm.value.message,
    };

    this.openaiService.getCompletion(conversationData).subscribe({
      next: (res: any) => {
        this.isLoaded = false;
        this.messages.push({
          sender: 'api',
          content: res.answer,
        });
        this.chatForm.reset();
      },
      error: (err) => {
        this.isLoaded = false;
        this.errorMessage = err.error.message;
      },
    });
  }
}
