import { Component } from '@angular/core';
import { GeminiService } from '../../services/gemini.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule, FormsModule],
})
export class DashboardComponent {
  niche = '';
  result = '';
  loading = false;

  constructor(
    private gemini: GeminiService,
    private auth: AuthService,
    private router: Router
  ) {}

  async generateContent() {
    this.loading = true;
    this.result = '';
    try {
      this.result = await this.gemini.generate(this.niche);
    } catch (e) {
      this.result = 'Failed to generate content.';
    }
    this.loading = false;
  }

  parseResult(text: string): {
    section: string;
    icon: string;
    title?: string;
    text: string;
    audioUrl?: string;
    hashtags?: string[];
  }[] {
    const jsonMatch = text.match(/```json([\s\S]*?)```/);
    if (!jsonMatch) return [];

    const rawJson = jsonMatch[1];
    let data;
    try {
      data = JSON.parse(rawJson);
      console.log('Parsed data:', data);
    } catch (e) {
      console.error('JSON parse error:', e);
      return [];
    }

    const result: any[] = [];

    // 🎧 Audios with URLs
    if (Array.isArray(data.audios)) {
      for (const audio of data.audios) {
        // Try multiple possible URL fields (adjust as needed)
        const audioUrl = audio.spotifyUrl || audio.links || audio.url || '';
        result.push({
          section: 'Trending Audios',
          icon: '🎧',
          title: audio.title + (audio.artist ? ' - ' + audio.artist : ''),
          text: audio.description || '',
          audioUrl: audioUrl,
        });
      }
    }

    // 🎬 Formats
    if (Array.isArray(data.formats)) {
      for (const format of data.formats) {
        result.push({
          section: 'Content Formats',
          icon: '🎬',
          text: format,
        });
      }
    }

    // ✍ Captions + Hashtags
    if (Array.isArray(data.captions)) {
      for (const cap of data.captions) {
        result.push({
          section: 'Captions',
          icon: '✍',
          title: cap.caption,
          text: '',
          hashtags: cap.hashtags,
        });
      }
    }

    // 📅 Posting Times
    if (Array.isArray(data.postingTimes)) {
      for (const time of data.postingTimes) {
        result.push({
          section: 'Posting Time',
          icon: '📅',
          text: time,
        });
      }
    }

    return result;
  }

  hasAudio(): boolean {
    return this.parseResult(this.result).some(
      (item) => item.icon === '🎧' && item.audioUrl
    );
  }

  isLink(url: string): boolean {
    // For now consider anything starting with http(s) as a link
    return /^https?:\/\//.test(url);
  }
}
