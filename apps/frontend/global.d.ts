import core from '@/plugins/core/langs/en.json';
import admin from '@/plugins/admin/langs/en.json';
import welcome from '@/plugins/welcome/langs/en.json';
import type blog from '@/plugins/blog/langs/en.json';
// ! === IMPORT ===

type Messages = typeof core & typeof admin  & typeof blog; // ! === MODULE ===

declare global {
  interface IntlMessages extends Messages {}
}
