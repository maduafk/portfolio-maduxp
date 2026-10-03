import { useState } from 'react';
import styles from './Skills.module.css';

const skillCategories = [
  {
    category: 'Backend',
    icon: '⚙️',
    skills: [
      { name: 'Java', level: 65 },
      { name: 'Spring Boot', level: 55 },
      { name: 'APIs REST', level: 65 },
      { name: 'Node.js', level: 55 },
      { name: 'TypeScript', level: 40 },
    ],
  },
  {
    category: 'Frontend',
    icon: '🖥️',
    skills: [
      { name: 'JavaScript', level: 55 },
      { name: 'Angular', level: 50 },
      { name: 'React', level: 50 },
      { name: 'HTML/CSS', level: 65 },
    ],
  },
  {
    category: 'Banco de Dados',
    icon: '🗄️',
    skills: [
      { name: 'SQL', level: 60 },
      { name: 'PostgreSQL', level: 55 },
      { name: 'Oracle', level: 45 },
    ],
  },
  {
    category: 'DevOps & Cloud',
    icon: '☁️',
    skills: [
      { name: 'Git', level: 70 },
      { name: 'Docker', level: 45 },
      { name: 'Jira', level: 50 },
      { name: 'JUnit / SonarQube', level: 45 },
    ],
  },
  {
    category: 'Ferramentas IA',
    icon: '🤖',
    skills: [
      { name: 'Cursor', level: 70 },
    ],
  },
  {
    category: 'Outros',
    icon: '📦',
    skills: [
      { name: 'JMS / ActiveMQ', level: 40 },
      { name: 'Kotlin / Android', level: 30 },
      { name: 'Inglês (int-avanç.)', level: 60 },
    ],
  },
];

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const visibleCategories =
    selectedCategory === null
      ? skillCategories
      : skillCategories.filter((c) => c.category === selectedCategory);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>⚙️ Painel de Controle - Habilidades</h3>
        <p>Selecione uma categoria para ver as habilidades instaladas</p>
      </div>

      <div className={styles.body}>
        <div className={styles.sidebar}>
          <ul className="tree-view" style={{ height: '100%' }}>
            <li><strong>Categorias</strong></li>
            <li>
              <button
                type="button"
                className={`${styles.categoryBtn} ${selectedCategory === null ? styles.categoryBtnActive : ''}`}
                onClick={() => setSelectedCategory(null)}
              >
                Todas
              </button>
            </li>
            {skillCategories.map((cat) => (
              <li key={cat.category}>
                <button
                  type="button"
                  className={`${styles.categoryBtn} ${selectedCategory === cat.category ? styles.categoryBtnActive : ''}`}
                  onClick={() => setSelectedCategory(cat.category)}
                >
                  {cat.icon} {cat.category}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.content}>
          {visibleCategories.map((cat) => (
            <fieldset key={cat.category} style={{marginBottom: 8}}>
              <legend>{cat.icon} {cat.category}</legend>
              {cat.skills.map((skill) => (
                <div key={skill.name} className={styles.skillRow}>
                  <label style={{width: 120, fontSize: 11}}>{skill.name}</label>
                  <progress max="100" value={skill.level} style={{flex: 1}} />
                  <span style={{width: 36, textAlign: 'right', fontSize: 10}}>{skill.level}%</span>
                </div>
              ))}
            </fieldset>
          ))}
        </div>
      </div>
    </div>
  );
}
