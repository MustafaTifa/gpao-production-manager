import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Permission } from 'src/app/core/models/permission.model';
import { Role, RoleRequest } from 'src/app/core/models/role.model';
import { PermissionService } from 'src/app/core/services/permission.service';
import { RoleService } from 'src/app/core/services/role.service';
import { DeleteComponentComponent } from 'src/app/shared/delete-component/delete-component.component';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {

  roles: Role[] = [];
  allPermissions: Permission[] = [];
  selectedPermissionIds: number[] = [];
  isEditMode = false;
  editingRoleId: number | null = null;
  isLoading = false;
  isSubmitting = false;
  showPermissionError = false;

  rolesDisplayedColumns = ['index', 'name', 'permissions', 'actions'];
  permissionColumns = ['selection', 'page', 'route', 'description'];

  roleForm: FormGroup;

  constructor(
    private roleService: RoleService,
    private permissionService: PermissionService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.roleForm = new FormGroup({
      name: new FormControl(null, Validators.required)
    });
    this.loadRoles();
    this.loadPermissions();
  }

  loadRoles(): void {
    this.isLoading = true;
    this.roleService.getAll().subscribe({
      next: (res) => {
        this.roles = res;
        this.isLoading = false;
      },
      error: () => {
        this.toastr.error('Une erreur est survenue, veuillez réessayer', '', { toastClass: 'toastr-error' });
        this.isLoading = false;
      }
    });
  }

  loadPermissions(): void {
    this.permissionService.getAll().subscribe({
      next: (res) => {
        this.allPermissions = res;
      },
      error: () => {
        this.toastr.error('Une erreur est survenue, veuillez réessayer', '', { toastClass: 'toastr-error' });
      }
    });
  }

  isSelected(permissionId: number): boolean {
    return this.selectedPermissionIds.includes(permissionId);
  }

  togglePermission(permissionId: number, checked: boolean): void {
    if (checked) {
      this.selectedPermissionIds = [...this.selectedPermissionIds, permissionId];
    } else {
      this.selectedPermissionIds = this.selectedPermissionIds.filter(id => id !== permissionId);
    }
    if (this.selectedPermissionIds.length > 0) {
      this.showPermissionError = false;
    }
  }

  areAllSelected(): boolean {
    return this.allPermissions.length > 0 &&
      this.allPermissions.every(p => this.selectedPermissionIds.includes(p.id));
  }

  selectAll(): void {
    this.selectedPermissionIds = this.allPermissions.map(p => p.id);
    this.showPermissionError = false;
  }

  deselectAll(): void {
    this.selectedPermissionIds = [];
  }

  onEdit(role: Role): void {
    this.roleService.getById(role.id).subscribe({
      next: (res) => {
        this.isEditMode = true;
        this.editingRoleId = res.id;
        this.roleForm.patchValue({ name: res.name });
        this.selectedPermissionIds = res.permissions.map(p => p.id);
        this.showPermissionError = false;
      },
      error: () => {
        this.toastr.error('Une erreur est survenue, veuillez réessayer', '', { toastClass: 'toastr-error' });
      }
    });
  }

  onSubmit(): void {
    if (this.roleForm.invalid) {
      this.roleForm.markAllAsTouched();
      return;
    }
    if (this.selectedPermissionIds.length === 0) {
      this.showPermissionError = true;
      return;
    }

    const payload: RoleRequest = {
      name: this.roleForm.value.name,
      permissionIds: this.selectedPermissionIds
    };

    if (this.isEditMode) {
      this.updateRole(payload);
    } else {
      this.createRole(payload);
    }
  }

  createRole(payload: RoleRequest): void {
    this.isSubmitting = true;
    this.roleService.create(payload).subscribe({
      next: () => {
        this.loadRoles();
        this.toastr.success('Rôle créé avec succès', '', { toastClass: 'toastr-success' });
        this.resetForm();
        this.isSubmitting = false;
      },
      error: () => {
        this.toastr.error('Une erreur est survenue, veuillez réessayer', '', { toastClass: 'toastr-error' });
        this.isSubmitting = false;
      }
    });
  }

  updateRole(payload: RoleRequest): void {
    this.isSubmitting = true;
    this.roleService.update(this.editingRoleId, payload).subscribe({
      next: () => {
        this.loadRoles();
        this.toastr.success('Rôle modifié avec succès', '', { toastClass: 'toastr-success' });
        this.resetForm();
        this.isSubmitting = false;
      },
      error: () => {
        this.toastr.error('Une erreur est survenue, veuillez réessayer', '', { toastClass: 'toastr-error' });
        this.isSubmitting = false;
      }
    });
  }

  onDelete(id: number): void {
    const ref = this.dialog.open(DeleteComponentComponent, {
      data: {
        title: 'Supprimer le rôle',
        description: 'Êtes-vous sûr de vouloir supprimer ce rôle ?'
      }
    });
    ref.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.roleService.delete(id).subscribe({
          next: () => {
            this.loadRoles();
            this.toastr.success('Rôle supprimé avec succès', '', { toastClass: 'toastr-success' });
            this.resetForm();
          },
          error: () => {
            this.toastr.error('Une erreur est survenue, veuillez réessayer', '', { toastClass: 'toastr-error' });
          }
        });
      }
    });
  }

  getPermissionNames(role: Role): string {
    return role.permissions.map(p => p.name).join(', ');
  }

  resetForm(): void {
    this.roleForm.reset();
    this.selectedPermissionIds = [];
    this.isEditMode = false;
    this.editingRoleId = null;
    this.showPermissionError = false;
  }
}