class DOMHelper {
  static clearEventListeners(element) {
    const clonedElement = element.cloneNode(true);
    element.replaceWith(clonedElement);
    return clonedElement;
  }

  static moveElement(elementId, newDestinationSelector) {
    const element = document.getElementById(elementId);
    const destinationElement = document.querySelector(newDestinationSelector);
    destinationElement.append(element);
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

class Component {
  constructor(hostElementId, insertBefore = false) {
    if (hostElementId) {
      this.hostElement = document.getElementById(hostElementId);
    } else {
      this.hostElement = document.body;
    }
    this.insertBefore = insertBefore;
  }

  detach() {
    if (this.element) {
      this.element.remove();
      // this.element.parentElement.removeChild(this.element);
    }
  }

  attach() {
    this.hostElement.insertAdjacentElement(
      this.insertBefore ? 'afterbegin' : 'beforeend',
      this.element
    );
  }
}

class Tooltip extends Component {
  constructor(closeNotifierFunction, text, hostElementId) {
    super(hostElementId);
    this.closeNotifier = closeNotifierFunction;
    this.text = text;
    this.create();
  }

  closeTooltip = () => {
    this.detach();
    this.closeNotifier();
  };

  create() {
    const tooltipElement = document.createElement('div');
    tooltipElement.className = 'card';
    const tooltipTemplate = document.getElementById('tooltip');
    const tooltipBody = document.importNode(tooltipTemplate.content, true);
    tooltipBody.querySelector('p').textContent = this.text;
    tooltipElement.append(tooltipBody);

    const hostElPosLeft = this.hostElement.offsetLeft;
    const hostElPosTop = this.hostElement.offsetTop;
    const hostElHeight = this.hostElement.clientHeight;
    const parentElementScrolling = this.hostElement.parentElement.scrollTop;

    const x = hostElPosLeft + 20;
    const y = hostElPosTop + hostElHeight - parentElementScrolling - 10;

    tooltipElement.style.position = 'absolute';
    tooltipElement.style.left = x + 'px'; // 500px
    tooltipElement.style.top = y + 'px';

    tooltipElement.addEventListener('click', this.closeTooltip);
    this.element = tooltipElement;
  }
}

class ProjectItem {
  hasActiveTooltip = false;

  constructor(id, updateProjectListsFunction, type) {
    this.id = id;
    this.projectItemElement = document.getElementById(this.id);
    this.updateProjectListsHandler = updateProjectListsFunction;
    this.connectMoreInfoButton();
    this.connectSwitchButton(type);
    this.connectDrag();
  }

  showMoreInfoHandler() {
    if (this.hasActiveTooltip) {
      return;
    }
    const tooltipText = this.projectElement.dataset.extraInfo;
    const tooltip = new Tooltip(
      () => {
        this.hasActiveTooltip = false;
      },
      tooltipText,
      this.id
    );
    tooltip.attach();
    this.hasActiveTooltip = true;
  }

  connectDrag(){
    this.projectItemElement.addEventListener('dragstart', event => {
      event.dataTransfer.setData('text/plain', this.id);
      event.dataTransfer.effectAllowed = 'move';
      // let's add some styles
      this.projectItemElement.classList.add('dragging');
    });

    this.projectItemElement.addEventListener('dragend', event => {
      debugger;
      this.projectItemElement.classList.remove('dragging');
    });
  }

  connectMoreInfoButton() {
    const moreInfoBtn = this.projectItemElement.querySelector(
      'button:first-of-type'
    );
    moreInfoBtn.addEventListener('click', this.showMoreInfoHandler.bind(this));
  }

  connectSwitchButton(type) {
    let switchBtn = this.projectItemElement.querySelector('button:last-of-type');
    switchBtn = DOMHelper.clearEventListeners(switchBtn);
    switchBtn.textContent = type === 'active' ? 'Finish' : 'Activate';
    switchBtn.addEventListener(
      'click',
      this.updateProjectListsHandler.bind(null, this.id)
    );
  }

  update(updateProjectListsFn, type) {
    this.updateProjectListsHandler = updateProjectListsFn;
    this.connectSwitchButton(type);
  }
}

class ProjectList{
  projects = [];

  constructor(type) {
    this.type = type;
    const prjItems = document.querySelectorAll(`#${type}-projects li`);
    for (const prjItem of prjItems) {
      this.projects.push(
        new ProjectItem(prjItem.id, this.switchProject.bind(this), this.type)
      );
    }
    console.log(this.projects);
    this.connectDroppable();
  }

  connectDroppable(){
    // let's select the from/to boxes
    const ulElement = document.querySelector(`#${this.type}-projects ul`)
    
    ulElement.addEventListener('dragover', function(event){ // children elements are included
      // Here, I can only read the type, not the payload, 🤔 ( I can do it only on the drop event)
      if (event.dataTransfer.types[0] === 'text/plain'){
        event.preventDefault();
      }
      // If I'm droping any other thing here than the li I expect, the drop event will be cancelled by default

    });

    ulElement.addEventListener('dragenter', function(event){
      // debugger;
       if (event.dataTransfer.types[0] === 'text/plain'){
        event.preventDefault();
        // debugger;
        ulElement.parentElement.classList.add('droppable');
      }
    });

    ulElement.addEventListener('dragleave', event => {
      // if dragged element is on top of the other list, then remove the class
      // debugger;
      if (!event.relatedTarget.closest(`#${this.type}-projects ul`)) {
        ulElement.parentElement.classList.remove('droppable');
      }
    })

    ulElement.addEventListener('drop', event => {
      // debugger;
      ulElement.parentElement.classList.remove('droppable');
      const droppedId = event.dataTransfer.getData('text/plain');
      if (this.projects.find(project => project.id === droppedId)){
        return;
      }
      this.selfAddProject(droppedId);
      
    });

  }

  setSwitchHandlerFunction(switchHandlerFunction) {
    this.switchHandler = switchHandlerFunction;
  }

  setGetProjectHandler(getProjectHandlerFunction){
    this.getProjectHandler = getProjectHandlerFunction;
  }

  selfAddProject(droppedId){
    DOMHelper.moveElement(droppedId, `#${this.type}-projects ul`);

    // let's get the project's instance from the other list/box
    const project = this.getProjectHandler(droppedId);

    this.projects.push(project);
    project.update(this.switchProject.bind(this), this.type);
  }

  // called from the other list/box
  addProject(project) {
    this.projects.push(project);
    DOMHelper.moveElement(project.id, `#${this.type}-projects ul`);
    project.update(this.switchProject.bind(this), this.type);
  }

  getProject(projectId){
    return this.projects.find(p => p.id == projectId);
  }

  switchProject(projectId) {
    // const projectIndex = this.projects.findIndex(p => p.id === projectId);
    // this.projects.splice(projectIndex, 1);
    // debugger;
    this.switchHandler(this.projects.find(p => p.id === projectId));
    this.projects = this.projects.filter(p => p.id !== projectId);
  }
}

class App {
  static init() {
    const activeProjectsList = new ProjectList('active');
    const finishedProjectsList = new ProjectList('finished');

    activeProjectsList.setSwitchHandlerFunction(
      finishedProjectsList.addProject.bind(finishedProjectsList)
    );
    activeProjectsList.setGetProjectHandler(finishedProjectsList.getProject.bind(finishedProjectsList));  

    finishedProjectsList.setSwitchHandlerFunction(
      activeProjectsList.addProject.bind(activeProjectsList)
    );
    finishedProjectsList.setGetProjectHandler(activeProjectsList.getProject.bind(activeProjectsList));

    // const timerId = setTimeout(this.startAnalytics, 3000);

    document.getElementById('stop-analytics-btn').addEventListener('click', () => {
      clearTimeout(timerId);
    });
  }

  static startAnalytics() {
    const analyticsScript = document.createElement('script');
    analyticsScript.src = 'assets/scripts/analytics.js';
    analyticsScript.defer = true;
    document.head.append(analyticsScript);
  }
}

App.init();

{/* <a 
class="header-btn--subscribe btn" 
href="https://www.thecourier.co.uk/subscribe" 
data-waypoint="google.com" 
onclick="window.pianoDCT.buttonClickHandler(event.target.attributes.href.nodeValue, event.target.dataset.waypoint)">
  Subscribe
</a>

onclick="window.pianoDCT.buttonClickHandler(event.target.attributes.href.nodeValue, event.target.dataset.waypoint)"

event.target.attributes.href.nodeValue, dataWaypoint: event.target.dataset.waypoint) */}

// event listener to store the data_waypoint after clicking CTAs
	// adding it here avoids adding it as part of a global experience, or next to the template one, as a RUN JS one
  // window.addEventListener("message", (event) => {
  //   if (event.data.type === 'buttonClicked' && event.data.href){
  //     const waypoint = event.data.waypoint ? event.data.waypoint : location.href;
  //     sessionStorage.setItem( 'waypoint', waypoint );
  //     location.href = event.data.href;
  //   }
  // }, false);

  // <a class="login header-login style=" href="https://piano-staging.dctdigital.cloud/thecourier/login" style="display: window.pianoId.isUserValid() ? 'block' : 'none'">Log In</a>
