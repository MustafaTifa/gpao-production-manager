import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";

export class StorageUtil {
    static menuForceExpanded$: BehaviorSubject<boolean> = new BehaviorSubject(StorageUtil.isMenuForceExpanded());

    static isMenuForceExpanded(): boolean {
        return !!window.localStorage.getItem('menuExpanded');
    }

    static toggleForceExpanded(): void {
        console.log('storrage : ', StorageUtil.isMenuForceExpanded());
        StorageUtil.isMenuForceExpanded() ? StorageUtil.collapseMenu() : StorageUtil.expandMenu();
    }

    static expandMenu(): void {
        window.localStorage.setItem('menuExpanded', 'true');
        StorageUtil.menuForceExpanded$.next(true);
    }

    static collapseMenu(): void {
        window.localStorage.removeItem('menuExpanded');
        StorageUtil.menuForceExpanded$.next(false);
    }

    
}