import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Role } from 'src/app/core/models/role.model';
import { UserRequest, UserResponse } from 'src/app/core/models/user.model';
import { RoleService } from 'src/app/core/services/role.service';
import { UserService } from 'src/app/core/services/user.service';
import { DeleteComponentComponent } from 'src/app/shared/delete-component/delete-component.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  users: UserResponse[] = [];
  allRoles: Role[] = [];
  isEditMode = false;
  editingUserId: number | null = null;
  isLoading = false;
  isSubmitting = false;

  displayedColumns = ['index', 'username', 'roles', 'actions'];

  userForm: FormGroup;

  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.userForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      roles: new FormControl([], Validators.required)
    });
    this.loadUsers();
    this.loadRoles();
  }

  loadUsers(): void {
    this.isLoading = true;
    this.userService.getAll().subscribe({
      next: (res) => {
        this.users = res;
        this.isLoading = false;
      },
      error: () => {
        this.toastr.error('Une erreur est survenue', '', { toastClass: 'toastr-error' });
        this.isLoading = false;
      }
    });
  }

  loadRoles(): void {
    this.roleService.getAll().subscribe({
      next: (res) => { this.allRoles = res; },
      error: () => {
        this.toastr.error('Une erreur est survenue', '', { toastClass: 'toastr-error' });
      }
    });
  }

  compareRoles(r1: { id: number; name: string }, r2: { id: number; name: string }): boolean {
    return r1 && r2 ? r1.id === r2.id : r1 === r2;
  }

  onEdit(user: UserResponse): void {
    this.isEditMode = true;
    this.editingUserId = user.id;
    this.userForm.patchValue({
      username: user.username,
      roles: user.roles
    });
    // Password optional on edit
    this.userForm.get('password').clearValidators();
    this.userForm.get('password').setValue(null);
    this.userForm.get('password').updateValueAndValidity();
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const formValue = this.userForm.value;
    const payload: UserRequest = {
      username: formValue.username,
      roles: formValue.roles
    };
    if (formValue.password) {
      payload.password = formValue.password;
    }

    if (this.isEditMode) {
      this.updateUser(payload);
    } else {
      this.createUser(payload);
    }
  }

  createUser(payload: UserRequest): void {
    this.isSubmitting = true;
    this.userService.create(payload).subscribe({
      next: () => {
        this.loadUsers();
        this.toastr.success('Utilisateur créé avec succès', '', { toastClass: 'toastr-success' });
        this.resetForm();
        this.isSubmitting = false;
      },
      error: () => {
        this.toastr.error('Une erreur est survenue', '', { toastClass: 'toastr-error' });
        this.isSubmitting = false;
      }
    });
  }

  updateUser(payload: UserRequest): void {
    this.isSubmitting = true;
    this.userService.update(this.editingUserId, payload).subscribe({
      next: () => {
        this.loadUsers();
        this.toastr.success('Utilisateur modifié avec succès', '', { toastClass: 'toastr-success' });
        this.resetForm();
        this.isSubmitting = false;
      },
      error: () => {
        this.toastr.error('Une erreur est survenue', '', { toastClass: 'toastr-error' });
        this.isSubmitting = false;
      }
    });
  }

  onDelete(id: number): void {
    const ref = this.dialog.open(DeleteComponentComponent, {
      data: {
        title: 'Supprimer l\'utilisateur',
        description: 'Êtes-vous sûr de vouloir supprimer cet utilisateur ?'
      }
    });
    ref.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.userService.delete(id).subscribe({
          next: () => {
            this.loadUsers();
            this.toastr.success('Utilisateur supprimé avec succès', '', { toastClass: 'toastr-success' });
            this.resetForm();
          },
          error: () => {
            this.toastr.error('Une erreur est survenue', '', { toastClass: 'toastr-error' });
          }
        });
      }
    });
  }

  resetForm(): void {
    this.userForm.reset({ roles: [] });
    this.userForm.get('password').setValidators(Validators.required);
    this.userForm.get('password').updateValueAndValidity();
    this.isEditMode = false;
    this.editingUserId = null;
  }
}
