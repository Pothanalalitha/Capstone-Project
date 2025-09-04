import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  // Add CommonModule import
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-list',
  standalone: true,                           // Make it standalone
  imports: [CommonModule],                    // Add CommonModule here
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  errorMessage: string | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.errorMessage = null;
      },
      error: (err) => {
        this.errorMessage = err.error || 'Failed to load user list';
      },
    });
  }

  deleteUser(id: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.loadUsers(); // reload list after deletion
        },
        error: (err) => {
          this.errorMessage = err.error || 'Failed to delete user';
        },
      });
    }
  }
}
