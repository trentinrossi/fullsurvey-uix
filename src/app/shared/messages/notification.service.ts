import { Injectable, EventEmitter } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class NotificationService {
  messages = new EventEmitter<Notification>();
  notification: Notification;

  show(body: Notification) {
    this.notification = {
      ...body,
      type: !!body.type ? body.type : MessageType.error
    };
    this.messages.emit(this.notification);
  }

  info(detail: string, summary?: string) {
    this.show({
      message: {
        title: summary,
        description: detail
      },
      type: MessageType.information
    });
  }

  warn(detail: string, summary?: string) {
    this.show({
      message: {
        title: summary,
        description: detail
      },
      type: MessageType.warning
    });
  }

  success(detail: string, summary?: string) {
    this.show({
      message: {
        title: summary,
        description: detail
      },
      type: MessageType.success
    });
  }

  error(detail: string, summary?: string) {
    this.show({
      message: {
        title: summary,
        description: detail
      },
      type: MessageType.error
    });
  }

  requestError(err: HttpErrorResponse) {
    const summary = err.status ? this.getTitleByStatus(err.status) : 'Erro';
    const detail = (err.error && err.error.message) || err.statusText || err.message || 'Erro';

    this.show({
      message: {
        title: summary,
        description: detail
      },
      type: MessageType.error
    });
  }

  private getTitleByStatus(status: number) {
    if (status === 401 || status === 403) {
      return 'Sem permissão';
    } else if (status === 404) {
      return 'Não encontrado';
    } else if (status === 504) {
      return 'Tempo limite esgotado';
    } else if (status >= 500) {
      return 'Erro interno';
    }
    return 'Erro';
  }
}

export interface Notification {
  message: {
    title: string;
    description: string;
  };
  type?: MessageType;
  closable?: boolean;
  time?: number;
}

export enum MessageType {
  error = 'error',
  success = 'success',
  information = 'info',
  warning = 'warn'
}
