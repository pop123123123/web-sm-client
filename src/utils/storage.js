const PROJECTS_KEY = 'projects';

const load = (name) => {
  const projects = JSON.parse(window.localStorage.getItem(PROJECTS_KEY) ?? '{}');
  return projects[name];
};

const save = (project) => {
  const projects = JSON.parse(window.localStorage.getItem(PROJECTS_KEY) ?? '{}');
  projects[project.name] = { ...project, loaded: undefined };
  window.localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
};

const list = () => JSON.parse(window.localStorage.getItem(PROJECTS_KEY) ?? '{}');

export { save, load, list };
