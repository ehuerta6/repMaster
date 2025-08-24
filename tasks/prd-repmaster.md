# Product Requirements Document (PRD) - RepMaster

## 1. Introducción/Overview

**RepMaster** es una aplicación minimalista y funcional para tracking de gimnasio que permite a usuarios registrar rutinas, hacer seguimiento de su progreso en fuerza y mantener un historial completo de entrenamientos. La aplicación está diseñada para ser simple, rápida de usar y enfocada en la funcionalidad esencial, sin depender de aplicaciones complejas o con funcionalidades innecesarias.

**Problema que resuelve:** Muchos usuarios que entrenan regularmente necesitan una herramienta simple para registrar sus rutinas, hacer seguimiento de progreso y mantener un historial, pero las aplicaciones existentes son demasiado complejas o tienen funcionalidades innecesarias.

**Objetivo:** Crear una aplicación MVP que permita a usuarios registrar y ejecutar rutinas de entrenamiento de manera eficiente, con progresión automática de peso y cálculo inteligente de discos.

## 2. Objetivos

### Objetivos Principales:

- Permitir a usuarios crear y gestionar rutinas de entrenamiento personalizadas
- Facilitar el registro diario de entrenamientos con interfaz simple y rápida
- Implementar progresión automática de peso basada en cumplimiento de objetivos
- Proporcionar cálculo automático de distribución de discos para diferentes tipos de equipamiento
- Mantener un historial completo y accesible de todos los entrenamientos realizados

### Objetivos Medibles:

- Usuarios pueden crear una rutina completa en menos de 5 minutos
- Completar un entrenamiento diario en menos de 2 minutos
- Reducir el tiempo de cálculo de discos de 30 segundos a 5 segundos
- Mantener un historial del 100% de entrenamientos realizados

## 3. Alcance (MVP)

### Incluido en MVP:

- Sistema de autenticación completo con Supabase
- Creación, edición y gestión de rutinas personalizadas
- Ejecución diaria de rutinas con registro de progreso
- Progresión automática de peso configurable por ejercicio
- Cálculo automático de distribución de discos
- Historial completo de entrenamientos
- Sistema de frecuencia flexible estilo Google Calendar
- Exportación/importación de datos en CSV/Excel
- Diseño responsive (mobile-first)

### No incluido en MVP:

- Gráficas y estadísticas avanzadas
- Sistema de notificaciones
- Funcionalidades sociales/comunidad
- Integración con wearables
- Planes de entrenamiento predefinidos
- Análisis de video o fotos de ejercicios

## 4. User Stories

### US1 - Autenticación

**Como** usuario nuevo  
**Quiero** poder registrarme con email y contraseña  
**Para** acceder a la aplicación y mantener mis datos seguros

**Como** usuario existente  
**Quiero** poder recuperar mi contraseña  
**Para** no perder acceso a mi cuenta si la olvido

### US2 - Gestión de Rutinas

**Como** usuario  
**Quiero** poder crear rutinas personalizadas con ejercicios específicos  
**Para** tener un plan de entrenamiento estructurado

**Como** usuario  
**Quiero** poder editar todos los campos de mis rutinas  
**Para** ajustar mi plan según mi progreso y necesidades

**Como** usuario  
**Quiero** poder reordenar ejercicios con drag & drop  
**Para** organizar mi rutina de la manera más eficiente

### US3 - Configuración de Frecuencia

**Como** usuario  
**Quiero** poder configurar la frecuencia de mis rutinas de manera flexible  
**Para** adaptar mi entrenamiento a mi horario y disponibilidad

### US4 - Ejecución Diaria

**Como** usuario  
**Quiero** ver mi rutina del día de manera clara y simple  
**Para** ejecutar mi entrenamiento sin distracciones

**Como** usuario  
**Quiero** poder marcar sets como completados fácilmente  
**Para** registrar mi progreso de manera rápida

### US5 - Progresión Automática

**Como** usuario  
**Quiero** que el peso se incremente automáticamente cuando cumpla mis objetivos  
**Para** progresar de manera consistente sin tener que recordarlo manualmente

### US6 - Cálculo de Discos

**Como** usuario  
**Quiero** que la app calcule automáticamente la distribución de discos  
**Para** ahorrar tiempo y evitar errores en el cálculo

### US7 - Historial

**Como** usuario  
**Quiero** poder ver mi historial completo de entrenamientos  
**Para** hacer seguimiento de mi progreso a largo plazo

### US8 - Exportación de Datos

**Como** usuario  
**Quiero** poder exportar mis rutinas e historial  
**Para** tener respaldo de mis datos y poder compartirlos

## 5. Requisitos Funcionales

### RF1 - Sistema de Autenticación

1. El sistema debe permitir registro de usuarios con email y contraseña
2. El sistema debe permitir login de usuarios existentes
3. El sistema debe permitir recuperación de contraseña por email
4. El sistema debe mantener sesiones activas de usuarios autenticados
5. El sistema debe permitir múltiples usuarios con datos separados

### RF2 - Gestión de Rutinas

6. El sistema debe permitir crear rutinas con nombre personalizable
7. El sistema debe permitir agregar ejercicios a rutinas con los siguientes campos:
   - Nombre del ejercicio
   - Músculo que trabaja
   - Rango de reps objetivo
   - Número de sets
   - Tipo de ejercicio (bilateral/unilateral)
   - Notas adicionales
8. El sistema debe permitir editar todos los campos de ejercicios existentes
9. El sistema debe permitir reordenar ejercicios mediante drag & drop
10. El sistema debe permitir eliminar ejercicios de rutinas
11. El sistema debe permitir eliminar rutinas completas

### RF3 - Configuración de Frecuencia

12. El sistema debe permitir configurar frecuencia de rutinas con opciones flexibles:
    - Cada X días (ej. cada 2 días, cada 3 días)
    - Días específicos de la semana (ej. lunes y jueves)
    - Patrones repetitivos (ej. lunes/miércoles/viernes)
13. El sistema debe mostrar la rutina correspondiente al día actual

### RF4 - Ejecución de Rutinas

14. El sistema debe mostrar la rutina del día de manera clara y simple
15. El sistema debe mostrar solo los campos esenciales durante la ejecución:
    - Nombre del ejercicio
    - Músculo que trabaja
    - Campos para peso y reps por set
16. El sistema debe proporcionar botones grandes para marcar sets como completados
17. El sistema debe permitir editar peso o reps durante la ejecución si es necesario
18. El sistema debe guardar automáticamente el entrenamiento en el historial cuando se completen todos los sets
19. El sistema debe ser "one-tap friendly" durante la ejecución:
    - Un solo tap debe marcar un set como completado
    - Los valores de peso y reps deben tener defaults auto-sugeridos basados en el historial reciente
    - La interfaz debe minimizar la necesidad de escritura durante el entrenamiento
20. El sistema debe permitir completar entrenamientos completos sin conexión a internet

### RF5 - Progresión Automática de Peso

19. El sistema debe permitir configurar incremento de peso por ejercicio individual
20. El sistema debe incrementar automáticamente el peso cuando todos los sets cumplan el target de reps
21. El sistema debe permitir configurar incrementos diferentes para cada ejercicio
22. El sistema debe mantener la configuración de incremento por ejercicio

### RF6 - Sistema de Unidades

23. El sistema debe permitir cambiar entre kg y lbs globalmente
24. El sistema debe convertir automáticamente todos los pesos al cambiar de unidad
25. El sistema debe recordar la preferencia de unidad del usuario

### RF7 - Cálculo de Discos

26. El sistema debe permitir configurar por ejercicio si usa barra o máquina
27. El sistema debe permitir configurar el peso de la barra por ejercicio
28. El sistema debe calcular la distribución óptima de discos total o por lado usando: 2.5, 5, 10, 25, 35 y 45
29. El sistema debe mostrar la distribución por lado de la barra
30. El sistema debe mostrar el peso total calculado
31. El sistema debe funcionar tanto para barras como para máquinas

### RF8 - Historial

32. El sistema debe guardar automáticamente cada entrenamiento completado
33. El sistema debe registrar para cada entrenamiento:
    - Nombre de la rutina
    - Ejercicios realizados
    - Peso usado y reps por set
    - Fecha y hora de realización
34. El sistema debe mostrar el historial en orden cronológico
35. El sistema debe permitir filtrar por períodos: semana, quincena, mes, semestre, año

### RF9 - Exportación/Importación

36. El sistema debe permitir exportar rutinas en formato CSV/Excel
37. El sistema debe permitir exportar historial en formato CSV/Excel
38. El sistema debe permitir importar rutinas desde archivos CSV/Excel
39. El sistema debe seguir un formato estándar para importación/exportación
40. El sistema debe proporcionar plantillas descargables con formato estándar para facilitar la importación
41. El sistema debe incluir documentación clara del formato CSV/Excel dentro de la aplicación
42. El sistema debe validar archivos importados y mostrar errores específicos si el formato no es correcto
43. La importación debe ser "plug & play" - los usuarios deben poder importar archivos sin necesidad de edición manual

## 6. Requisitos No Funcionales

### RNF1 - Rendimiento

- La aplicación debe cargar en menos de 3 segundos en conexiones 3G
- Las operaciones de CRUD deben completarse en menos de 1 segundo
- El cálculo de discos debe realizarse en menos de 100ms

### RNF2 - Usabilidad

- La interfaz debe ser usable en dispositivos móviles con pantallas de 5" o mayores
- La aplicación debe ser responsive y funcional en desktop
- Los botones principales deben tener un tamaño mínimo de 44x44px en móvil

### RNF3 - Confiabilidad

- Los datos deben persistir correctamente en Supabase
- La aplicación debe funcionar offline para visualización de datos ya cargados
- La aplicación debe permitir completar entrenamientos completos sin conexión a internet
- La sincronización debe ser automática cuando se recupere la conexión
- Los datos offline deben sincronizarse de manera confiable sin pérdida de información
- La aplicación debe poder instalarse como PWA en dispositivos móviles y desktop
- La funcionalidad offline debe ser total durante entrenamientos, sin dependencia de conexión a internet

### RNF4 - Seguridad

- Las contraseñas deben ser hasheadas antes de almacenarse
- Las sesiones deben expirar después de 30 días de inactividad
- Los datos de usuario deben estar completamente aislados

### RNF5 - Mantenibilidad

- El código debe seguir las mejores prácticas de TypeScript
- La arquitectura debe permitir agregar nuevas funcionalidades fácilmente
- El código debe incluir comentarios para funciones complejas

## 7. Tecnologías

### Frontend:

- **Framework:** Next.js 14+ con App Router
- **Lenguaje:** TypeScript 5+
- **Styling:** TailwindCSS 3+
- **Estado:** React Context API o Zustand
- **Drag & Drop:** react-beautiful-dnd o @dnd-kit/core

### Backend:

- **Plataforma:** Supabase
- **Autenticación:** Supabase Auth
- **Base de Datos:** PostgreSQL (via Supabase)
- **Storage:** Supabase Storage (si es necesario para archivos)

### Herramientas de Desarrollo:

- **Linting:** ESLint + Prettier
- **Testing:** Jest + React Testing Library
- **Deployment:** Vercel o similar
- **PWA:** Service Worker y manifest.json para funcionalidad offline e instalación

## 8. Roadmap / Fases de Implementación

### Fase 1 - Fundación (Semanas 1-2)

- Configuración del proyecto Next.js + TypeScript + TailwindCSS
- Integración con Supabase
- Sistema de autenticación básico (registro, login, recuperación de contraseña)
- Estructura de base de datos básica

### Fase 2 - Gestión de Rutinas (Semanas 3-4)

- CRUD completo de rutinas
- CRUD completo de ejercicios
- Sistema de drag & drop para reordenar ejercicios
- Configuración de frecuencia de rutinas

### Fase 3 - Ejecución de Rutinas (Semanas 5-6)

- Página principal con rutina del día
- Interfaz de ejecución de entrenamientos
- Sistema de marcado de sets completados
- Guardado automático en historial

### Fase 4 - Progresión y Cálculos (Semanas 7-8)

- Sistema de progresión automática de peso
- Cálculo automático de distribución de discos
- Sistema de unidades (kg/lbs)
- Configuración por ejercicio

### Fase 5 - Historial y Exportación (Semanas 9-10)

- Sistema de historial completo
- Filtros de tiempo
- Exportación/importación en CSV/Excel
- Testing y refinamiento

### Fase 6 - Pulido y Deploy (Semanas 11-12)

- Testing completo
- Optimizaciones de rendimiento
- Deploy a producción
- Documentación de usuario

## 9. Consideraciones Técnicas

### Base de Datos:

- Tabla `users` para información de usuarios
- Tabla `routines` para rutinas de entrenamiento
- Tabla `exercises` para ejercicios individuales
- Tabla `routine_exercises` para relación muchos-a-muchos entre rutinas y ejercicios
- Tabla `workouts` para entrenamientos completados
- Tabla `workout_sets` para sets individuales de cada entrenamiento
- Tabla `exercise_configs` para configuración específica de cada ejercicio (incremento de peso, tipo de barra, etc.)

### Arquitectura:

- Componentes reutilizables para ejercicios, rutinas y sets
- Hooks personalizados para lógica de negocio
- Context API para estado global de usuario y configuración
- API routes de Next.js para operaciones complejas si es necesario

### Consideraciones de UX:

- Interfaz minimalista pero funcional
- Botones grandes y claros para acciones principales
- Navegación intuitiva entre secciones
- Feedback visual inmediato para todas las acciones
- **Ejecución de entrenamientos:** Interfaz "one-tap friendly" con defaults inteligentes
- **Experiencia offline:** Funcionalidad completa sin conexión, sincronización transparente
- **Importación/Exportación:** Proceso plug & play con plantillas y documentación integrada

## 10. Criterios de Aceptación

### MVP Completado cuando:

- [ ] Usuarios pueden registrarse y autenticarse
- [ ] Usuarios pueden crear y editar rutinas completas
- [ ] Usuarios pueden ejecutar rutinas diarias y registrar progreso
- [ ] El sistema progresa automáticamente el peso según configuración
- [ ] El sistema calcula distribución de discos correctamente
- [ ] El historial se mantiene completo y accesible
- [ ] La aplicación es responsive y funcional en móvil y desktop
- [ ] Los datos se pueden exportar/importar en formatos estándar
- [ ] La aplicación funciona completamente offline durante entrenamientos
- [ ] La interfaz de ejecución es "one-tap friendly" con defaults inteligentes
- [ ] La importación/exportación es plug & play con plantillas integradas
- [ ] La aplicación puede instalarse como PWA en dispositivos móviles y desktop
- [ ] La funcionalidad offline es total durante entrenamientos, sin dependencia de conexión

## 11. Preguntas Abiertas

1. **Métricas de éxito:** ¿Qué métricas específicas queremos rastrear para medir el éxito del MVP?
2. **Escalabilidad:** ¿Cuántos usuarios simultáneos esperamos que use la aplicación?
3. **Integración futura:** ¿Hay alguna integración específica que queramos considerar para versiones posteriores?
4. **Localización:** ¿Necesitamos soporte para múltiples idiomas en el MVP?
5. **Backup:** ¿Qué estrategia de backup queremos implementar para los datos de Supabase?

---

**Documento generado:** [Fecha actual]  
**Versión:** 1.0  
**Estado:** Pendiente de revisión
