// Déclaration de type pour les CSS Modules (*.module.css)
// Permet à TypeScript de résoudre les imports de la forme :
//   import styles from './Foo.module.css'
declare module '*.module.css' {
  const classes: Record<string, string>;
  export default classes;
}

