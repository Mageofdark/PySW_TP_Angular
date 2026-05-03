import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class ThemeService {
  private theme: 'light' | 'dark' = 'light';

  initTheme() {
    if(typeof window === 'undefined') return;

    const savedTheme = localStorage.getItem('theme');

    if(savedTheme === 'dark'){
      this.theme = 'dark';
    }else{
      this.theme = 'light';
    }

    this.applyTheme();
  }
  
  toggleTheme(){
    this.theme = this.theme === 'dark' ? 'light' : 'dark';

    localStorage.setItem('theme', this.theme);

    this.applyTheme();
  }

  private applyTheme() {
    document.body.setAttribute('data-bs-theme', this.theme);
  }

  currentTheme(){
    return this.theme;
  }
}