'use strict';

const SOURCES = {
  employee: 'https://nsuem.ru/employee/',
  eios: 'https://nsuem.ru/eios/',
  moodle: 'https://nsuem.ru/employee/moodle/',
  contacts: 'https://www.nsuem.ru/faculties/f-it/contacts.php'
};
const CONTACTS = {
  hr:{name:'Наталья Юрьевна Киреева',phone:'+7 (383) 243-95-17',tel:'+73832439517',extension:'1193',email:'n.y.kireeva@nsuem.ru',office:'Корпус 1, кабинет 24а'},
  schedule:{name:'Елена Александровна Клепикова',phone:'+7 (383) 243-95-27',tel:'+73832439527',extension:'5089',email:'e.a.klepikova@nsuem.ru',office:'Корпус 1, кабинет 42/1'},
  payroll:{name:'Оксана Николаевна Кабацкая',phone:'+7 (383) 243-94-46',tel:'+73832439446',extension:'1083',email:'o.n.kabackaya@nsuem.ru',office:'Корпус 1, кабинет 30'}
};
const GROUPS = ['Первое знакомство', 'До первого занятия', 'В рабочем ритме'];
const ICONS = {
  people: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M16 3a4 4 0 0 1 0 8M22 21v-2a4 4 0 0 0-3-3.87"/><circle cx="9" cy="7" r="4"/>',
  file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Zm0 0v6h6M8 13h8M8 17h6"/>',
  card: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 9h20M6 15h4"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 5 10 8L22 5"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18M8 15h2M14 15h2"/>',
  book: '<path d="M12 6c-3-2-7-2-10-1v15c3-1 7-1 10 1 3-2 7-2 10-1V5c-3-1-7-1-10 1Zm0 0v15"/>',
  folder: '<path d="M3 7V5a2 2 0 0 1 2-2h4l3 3h7a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Zm0 3h18"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  growth: '<path d="M3 20h18M6 16v-4M12 16V8M18 16V4M4 8l5-4 4 2 6-4"/>',
  support: '<path d="M3 14v-3a9 9 0 0 1 18 0v3M21 17v1a3 3 0 0 1-3 3h-4"/><rect x="2" y="11" width="4" height="7" rx="2"/><rect x="18" y="11" width="4" height="7" rx="2"/>',
  check: '<path d="m5 12 4 4L19 6"/>'
};
const TASKS = [
  {id:'department',stage:0,icon:'people',title:'Познакомиться с кафедрой',hint:'Люди, к которым можно прийти с вопросом',keywords:'заведующий секретарь наставник коллеги',intro:'Начните с людей: на кафедре помогут разобраться с задачами именно вашей должности.',result:"Вы знаете, кто помогает вам на кафедре и как с ним связаться.",steps:['Уточните, кто поможет вам в первые недели: заведующий кафедрой, секретарь или назначенный коллега.','Обсудите дисциплины, группы и ближайшие занятия. Запишите, у кого уточнять изменения.','Узнайте принятый на кафедре способ связи с коллегами и студентами.'],links:[['Найти кафедру в справочнике',SOURCES.contacts]],source:'Предложенный шаг адаптации. Это не дословная инструкция из бумажной памятки.'},
  {id:'documents',stage:0,icon:'file',title:'Уточнить оформление и инструктажи',hint:'Документы и обязательные процедуры',keywords:'кадры трудоустройство охрана труда пожарная безопасность инструктаж бухгалтерия зарплата',intro:'В памятке выделены оформление и инструктажи. Актуальный перечень и порядок прохождения подтвердит ответственное подразделение.',result:"Вы знаете, какие действия по оформлению остались и где пройти инструктажи.",steps:['Уточните у кадрового специалиста, завершено ли оформление и какие документы ещё нужны именно вам.','Согласуйте, где и когда пройти необходимые инструктажи.','Уточните порядок передачи реквизитов для начисления заработной платы.'],links:[['Контакт по оформлению','#help'],['Материалы для сотрудников',SOURCES.employee]],source:'Памятка новому работнику. Порядок, сроки и ответственные требуют подтверждения вузом.'},
  {id:'campus-card',stage:0,icon:'card',title:'Разобраться с кампусной картой',hint:'Пропуск и повседневная жизнь в университете',keywords:'пропуск проход библиотека карта кампус',intro:'В памятке кампусная карта описана как пропуск и читательский билет. Действующий порядок оформления уточните перед обращением.',result:"Вы знаете, куда обратиться за картой и как согласовать проход до её получения.",steps:['Уточните на кафедре или в кадровом подразделении, куда обратиться для оформления карты.','Узнайте, что подготовить и как получить карту.','Уточните действующие возможности карты и правила прохода в корпуса.'],links:[['Контакты по оформлению','#help'],['Что известно о карте','#guide/campus-card-guide']],source:'Памятка новому работнику. Условия оформления и использования карты пока не сверены.'},
  {id:'email',stage:1,icon:'mail',title:'Настроить корпоративную почту',hint:'Рабочая переписка и университетские сообщения',keywords:'почта email e-mail логин пароль доступ учётная запись обмен письма exchange',intro:'Корпоративная почта — один из рабочих сервисов, опубликованных в разделе «Сотруднику».',result:"Вы вошли в корпоративную почту и проверили доступ к своему ящику.",steps:['Уточните на кафедре или в технической поддержке порядок получения корпоративной учётной записи.','После получения доступа откройте корпоративную почту и проверьте вход.','Если войти не получается, подготовьте описание ошибки для технической поддержки. Пароль никому не передавайте.'],links:[['Открыть почту','https://exchange-new.nsuem.ru/'],['Помощь со входом','#help']],source:'Официальный раздел «Сотруднику» и навигационная карта ЭИОС.',sourceUrl:SOURCES.eios},
  {id:'schedule',stage:1,icon:'calendar',title:'Найти своё расписание',hint:'Даты, время, группы и аудитории',keywords:'расписание пара занятие аудитория корпус время учебный процесс',intro:'Перед первым занятием сверьте расписание и уточните всё, что вызывает вопросы.',result:"Вы нашли ближайшее занятие и проверили дату, время, группу и аудиторию.",steps:['Откройте раздел «Преподаватели» в расписании и найдите себя по фамилии.','Проверьте дату, время, группу, корпус и аудиторию.','При расхождении или отсутствии занятия уточните информацию на кафедре или в бюро расписаний.'],links:[['Открыть расписание','https://rasps.nsuem.ru/teacher'],['Контакт бюро расписаний','#help']],source:'Официальный раздел «Сотруднику».',sourceUrl:SOURCES.employee},
  {id:'moodle',stage:1,icon:'book',title:'Освоиться в Moodle',hint:'Учебные курсы, письменные работы и инструкции',keywords:'moodle мудл портал сдо sdo курс проверка работы студенты оценки загрузить',intro:'На официальной странице Moodle собраны вход на портал и инструкции для преподавателей.',result:"Вы вошли в Moodle, нашли свой курс и проверили, доступна ли нужная работа с ним.",steps:['Откройте Moodle и проверьте вход. Если учётной записи ещё нет или вход не удаётся, откройте раздел «Помощь»: там есть путь к контактам без авторизации.','Найдите свой курс и проверьте, доступна ли работа с ним в роли преподавателя. Если курс отсутствует, уточните на кафедре его название и ответственного за предоставление доступа.','Откройте нужные инструкции: на странице есть материалы по проверке письменных работ, срокам загрузки и оцениванию отчётов по практике.'],links:[['Войти в Moodle','https://sdo.nsuem.ru/'],['Инструкции преподавателю',SOURCES.moodle],['Помощь со входом','#help']],source:'Официальная страница образовательного портала Moodle.',sourceUrl:SOURCES.moodle},
  {id:'materials',stage:1,icon:'folder',title:'Подготовить материалы к первому занятию',hint:'Программа дисциплины, задания и оборудование',keywords:'рпд рабочая программа методические материалы умк проектор презентация оборудование',intro:'Обсудите подготовку с кафедрой: состав материалов и требования зависят от дисциплины.',result:"У вас есть программа дисциплины, план первого занятия и договорённость по оборудованию.",steps:['Уточните, где получить действующую рабочую программу и методические материалы по своей дисциплине.','Подготовьте план первого занятия и материалы для студентов с учётом требований кафедры.','Заранее уточните возможности аудитории и порядок получения помощи с оборудованием.'],links:[['ЭИОС: программы и материалы',SOURCES.eios],['Найти методическую помощь',SOURCES.contacts]],source:'Предложенный шаг подготовки к занятию. Требования уточняются на кафедре; это не дословная инструкция памятки.'},
  {id:'tandem',stage:2,icon:'grid',title:'Разобраться с журналами и ведомостями',hint:'«ТАНДЕМ.УНИВЕРСИТЕТ» и учебные процессы',keywords:'тандем tandem журнал ведомость нагрузка учебный план оценки',intro:'ЭИОС — электронная информационно-образовательная среда НГУЭУ. В её навигационной карте опубликован переход в «ТАНДЕМ.УНИВЕРСИТЕТ» — личный кабинет преподавателя.',result:"Вы вошли в «Тандем» и знаете порядок работы с журналами и ведомостями.",steps:['Уточните порядок доступа и необходимые для вашей работы функции системы.','Попросите показать принятый порядок ведения журналов и работы с ведомостями.','Сроки внесения сведений и порядок исправлений уточняйте у ответственного за учебный процесс.'],links:[['Открыть «Тандем»','https://tandem.nsuem.ru/'],['Описание систем ЭИОС',SOURCES.eios]],source:'Навигационная карта ЭИОС и памятка новому работнику.',sourceUrl:SOURCES.eios},
  {id:'library',stage:2,icon:'book',title:'Познакомиться с научной библиотекой',hint:'Литература и электронные ресурсы для занятий',keywords:'библиотека книги литература электронные ресурсы эбс znanium юрайт',intro:'Библиотека поможет найти литературу и электронные ресурсы для преподавания и исследований.',result:"Вы нашли нужные библиотечные ресурсы и знаете условия доступа.",steps:['Откройте раздел научной библиотеки и познакомьтесь с доступными ресурсами.','Уточните правила регистрации и доступа к нужным электронным библиотечным системам.','При необходимости обратитесь к сотрудникам библиотеки за помощью в поиске литературы.'],links:[['Научная библиотека','https://nsuem.ru/library/'],['Электронные ресурсы ЭИОС',SOURCES.eios]],source:'Официальная страница научной библиотеки и навигационная карта ЭИОС.',sourceUrl:'https://nsuem.ru/library/'},
  {id:'development',stage:2,icon:'growth',title:'Узнать о возможностях для сотрудников',hint:'Развитие, поддержка и жизнь вне занятий',keywords:'повышение квалификации развитие спорт бассейн семья социальная поддержка льготы отдых',intro:'Освоившись с основными задачами, познакомьтесь с возможностями университета.',result:"Вы выбрали интересующую возможность и знаете, у кого уточнить условия участия.",steps:['Посмотрите раздел «Сотруднику»: там собраны ссылки на дополнительное образование, спорт и другие возможности.','Уточните у ответственного подразделения действующие программы поддержки и условия участия.','Обсудите с руководителем подходящие направления профессионального развития.'],links:[['Возможности для сотрудников',SOURCES.employee],['Поддержка и быт','#guide/family-payments']],source:'Раздел «Сотруднику»; темы развития и поддержки из памятки. Условия проверяются отдельно.',sourceUrl:SOURCES.employee}
];
const SERVICES = [
  {id:'schedule-service',icon:'calendar',title:'Расписание',text:'Занятия, группы, время и аудитории.',url:'https://rasps.nsuem.ru/teacher',action:'Посмотреть расписание',keywords:'пары занятия корпус аудитория'},
  {id:'moodle-service',icon:'book',title:'Moodle',text:'Образовательный портал и инструкции для преподавателя.',url:SOURCES.moodle,action:'Открыть портал и инструкции',keywords:'сдо sdo мудл работы курс'},
  {id:'mail-service',icon:'mail',title:'Корпоративная почта',text:'Университетская переписка в рабочем почтовом ящике.',url:'https://exchange-new.nsuem.ru/',action:'Перейти к почте',keywords:'email e-mail exchange пароль'},
  {id:'tandem-service',icon:'grid',title:'Тандем',text:'Личный кабинет преподавателя и учебные процессы.',url:'https://tandem.nsuem.ru/',action:'Открыть «Тандем»',keywords:'tandem журналы ведомости нагрузка'},
  {id:'support-service',icon:'support',title:'Техническая поддержка',text:'Корпоративная служба поддержки «ИнфраМенеджер». Для подачи заявки требуется вход. Если учётной записи нет, откройте раздел «Помощь».',url:'https://servicedesk.nsuem.ru/',action:'Открыть поддержку — нужен вход',keywords:'инфраменеджер ошибка доступ компьютер'},
  {id:'library-service',icon:'folder',title:'Научная библиотека',text:'Литература и электронные ресурсы для учёбы и исследований.',url:'https://nsuem.ru/library/',action:'Найти ресурсы библиотеки',keywords:'книги эбс литература'},
  {id:'directum-service',icon:'file',title:'Directum RX',text:'Система электронного документооборота.',url:'https://doc.nsuem.ru/',action:'Перейти в Directum RX',keywords:'документы шаблоны директум'},
  {id:'antiplagiat-service',icon:'file',title:'Антиплагиат',text:'Система проверки текстов на заимствования.',url:'https://nsuem.antiplagiat.ru/',action:'Перейти в «Антиплагиат»',keywords:'оригинальность заимствования'},
  {id:'ic-service',icon:'people',title:'Информационный центр',text:'Услуги сопровождения образовательного процесса.',url:'https://ic.nsuem.ru/',action:'Открыть услуги центра',keywords:'аттестация пересдачи'}
];
const HELP = [
  {id:'it-help',icon:'support',title:'Нет доступа или не получается войти',text:'Если учётной записи ещё нет, найдите в официальном справочнике управление информатизации или группу сопровождения информационных систем и уточните порядок получения доступа. Если выданный доступ перестал работать, подготовьте название системы и описание ошибки. Пароль никому не передавайте.',who:'Техническая поддержка',url:SOURCES.contacts,action:'Открыть справочник без входа',links:[['Портал поддержки — нужен вход','https://servicedesk.nsuem.ru/']],keywords:'it ит логин пароль доступ ошибка почта мудл moodle тандем компьютер интернет wifi вайфай восстановление сброс забытый учетная запись'},
  {id:'hr-help',icon:'file',title:'Вопрос по оформлению на работу',text:'Уточните, какие документы ещё нужны и к кому обратиться по инструктажам и кампусной карте. Порядок оформления подтвердит подразделение.',who:'Отдел подбора и развития персонала',contact:CONTACTS.hr,url:SOURCES.contacts,action:'Проверить контакт в справочнике',keywords:'кадры оформление договор трудоустройство инструктаж охрана труда пропуск карта'},
  {id:'schedule-help',icon:'calendar',title:'Вопрос по расписанию или аудитории',text:'Сверьте дату и свои занятия в разделе преподавателей. Если занятие отсутствует или есть расхождение, уточните его на кафедре или в бюро расписаний.',who:'Бюро расписаний',contact:CONTACTS.schedule,url:SOURCES.contacts,action:'Проверить контакт в справочнике',links:[['Расписание преподавателей','https://rasps.nsuem.ru/teacher']],keywords:'расписание аудитория пара корпус время замена группа'},
  {id:'payroll-help',icon:'card',title:'Вопрос по зарплате и реквизитам',text:'По начислению и выплате зарплаты обратитесь в расчётную группу. Перед передачей банковских реквизитов уточните установленный способ отправки.',who:'Расчётная группа',contact:CONTACTS.payroll,url:SOURCES.contacts,action:'Проверить контакт в справочнике',keywords:'зарплата начисления бухгалтерия реквизиты выплаты расчетный листок'},
  {id:'method-help',icon:'people',title:'Вопрос по преподаванию и материалам',text:'Рабочая программа, методические требования, журналы и ведомости. Начните с заведующего кафедрой или назначенного коллеги; название кафедры и контакты можно найти в справочнике.',who:'Ваша кафедра',url:SOURCES.contacts,action:'Найти свою кафедру',keywords:'методический рпд программа умк материалы журнал ведомость нагрузка'}
];
const KEY = 'nsuem-teacher-start-v1';
const GUIDE_FOR_TASK = {department:'structure-guide',documents:'employment','campus-card':'campus-card-guide',email:'mail-guide',schedule:'schedule-guide',moodle:'moodle-guide',materials:'eios-guide',tandem:'tandem-guide',library:'library-guide',development:'career-growth'};
const normalize = text => String(text).toLocaleLowerCase('ru').replaceAll('ё','е').trim();
function searchWords(text) {
  // ponytail: limited Russian normalization; add a stemmer only if real queries exceed these rules.
  const aliases={войти:'доступ',вход:'доступ',зайти:'доступ',входить:'доступ',логин:'доступ',логина:'доступ',аккаунт:'доступ',аккаунта:'доступ',забыл:'восстановление',забыла:'восстановление',забыли:'восстановление',забытый:'восстановление',мудл:'moodle',сдо:'moodle',sdo:'moodle',email:'почта',mail:'почта',кадры:'оформление',кадровый:'оформление'};
  return [...new Set((normalize(text).replace(/wi[\s-]*fi|вай[\s-]*фай/gu,' интернет ').replace(/не\s+(работает|открывается|получается)/gu,' ошибка ').match(/[\p{L}\p{N}]+/gu)||[])
    .filter(word=>!['как','где','куда','когда','что','это','для','мне','меня','мой','мои','свой','свое','нет','не','без','или','и','в','на','по','к','у','о','с','из','за','ли','кто','чем','чтобы','нужно','нужен','нужна','взять','получить','открыть'].includes(word))
    .map(word=>aliases[word]||word).map(word=>word.length>4?word.replace(/(иями|ами|ями|ах|ях|ов|ев|ом|ем|ой|ий|ый|ая|яя|ое|ее|ые|ие|ую|юю|а|я|ы|и|у|ю|е)$/u,''):word))];
}
function searchScore(item,query) {
  const words=searchWords(query),heading=new Set(searchWords([item.title,item.hint,item.who].filter(Boolean).join(' ')));
  const text=new Set(searchWords([item.title,item.hint,item.who,item.text,item.summary,item.keywords,item.intro,item.result,item.contact?.name,item.contact?.email,item.category==='support'?'льгота льготы социальная поддержка':'',...(item.steps||[]),...(item.blocks||[]).flatMap(block=>[block.title,...block.items])].filter(Boolean).join(' ')));
  return words.length&&words.every(word=>text.has(word))?words.reduce((score,word)=>score+10+(heading.has(word)?3:0),0):0;
}
const matches = (item,query) => searchScore(item,query)>0;
function restoreProgress(raw) {
  if (!raw) return new Set();
  const parsed = JSON.parse(raw);
  if (!Array.isArray(parsed)) throw new Error('Invalid progress');
  return new Set(parsed.filter(id => typeof id === 'string' && TASKS.some(task => task.id === id)));
}
const icon = name => `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[name] || ICONS.file}</svg>`;
const external = (title,url,css='text-link') => `<a class="${css}" href="${url}"${url.startsWith('https:')?' target="_blank" rel="noopener noreferrer"':''}>${title}${url.startsWith('https:')?' <span aria-hidden="true">↗</span><span class="sr-only"> (в новой вкладке)</span>':''}</a>`;

function resetReloadNavigation() {
  if(performance.getEntriesByType('navigation')[0]?.type!=='reload')return;
  history.scrollRestoration='manual';
  history.replaceState(history.state,'',location.pathname+location.search);
  const top=()=>window.scrollTo({top:0,left:0,behavior:'instant'});
  top();
  window.addEventListener('load',top,{once:true});
}

function boot() {
  resetReloadNavigation();
  const $ = id => document.getElementById(id);
  let done = new Set(), storageFailed = false, stage = 'all', currentView = 'route', toastTimer, resetTimer, resetArmed = false;
  try { done = restoreProgress(localStorage.getItem(KEY)); } catch { storageFailed = true; }

  function toast(message) { clearTimeout(toastTimer); $('toast').textContent=message; $('toast').hidden=false; toastTimer=setTimeout(() => $('toast').hidden=true,4500); }
  function save() { try {localStorage.setItem(KEY,JSON.stringify([...done]));return true;} catch {return false;} }
  function progress() {
    $('progress').value=done.size;
    $('progress-text').textContent=`${done.size} из ${TASKS.length} шагов отмечено`;
    $('progress-percent').textContent=`${done.size*10}%`;
    const next=TASKS.find(task => !done.has(task.id));
    $('continue-link').href=next ? `#step/${next.id}` : '#route';
    $('continue-link').innerHTML=`${done.size===0?'Начать мой маршрут':next?'Продолжить маршрут':'Маршрут отмечен'} <span aria-hidden="true">${next?'↗':'✓'}</span>`;
    for (const task of TASKS) {
      const row=$(`task-${task.id}`), checked=done.has(task.id);
      row.classList.toggle('completed',checked);
      row.querySelector('input').checked=checked;
      row.querySelector('input').setAttribute('aria-label',`${checked?'Снять отметку с шага':'Отметить шаг'}: ${task.title}`);
      row.querySelector('.task-icon').innerHTML=icon(checked?'check':task.icon);
      row.querySelector('.task-state').textContent=checked?'Отмечено':'';
      row.querySelector('.completion-label').textContent=checked?'Шаг отмечен как выполненный':'Отметить как выполненный';
    }
    for (let i=0;i<GROUPS.length;i++) {
      const count=TASKS.filter(task=>task.stage===i&&done.has(task.id)).length;
      $(`group-progress-${i}`).textContent=`${count} / ${TASKS.filter(task=>task.stage===i).length} отмечено`;
    }
  }
  function filters() {
    let visible=0;
    TASKS.forEach(task=>{const show=(stage==='all'||Number(stage)===task.stage)&&(!$('remaining-only').checked||!done.has(task.id));$(`task-${task.id}`).hidden=!show;if(show)visible++;});
    GROUPS.forEach((_,i)=>{$(`group-${i}`).hidden=!TASKS.some(task=>task.stage===i&&!$(`task-${task.id}`).hidden);});
    $('route-empty').hidden=visible>0;
    $('visible-count').textContent=stage==='all'?'Все этапы':GROUPS[Number(stage)];
    document.querySelectorAll('[data-stage]').forEach(button=>{const active=button.dataset.stage===stage;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));});
  }
  function showView(view) {
    currentView=view;
    const searching=normalize($('search').value).length>0;
    ['route','guide','services','help'].forEach(name=>{$(`${name}-view`).hidden=name!==view||searching;});
    $('search-results').hidden=!searching;
    $('welcome').hidden=view!=='route'||searching;
    document.querySelectorAll('[data-nav]').forEach(link=>{if(link.dataset.nav===view)link.setAttribute('aria-current','page');else link.removeAttribute('aria-current');});
  }
  function search() {
    const query=$('search').value.trim();
    $('clear-search').hidden=!query;
    if(!query){showView(currentView);return;}
    const results=[...TASKS.map(item=>({item,kind:'Шаг маршрута',type:'task'})),...ARTICLES.map(item=>({item,kind:'Памятка',type:'article'})),...SERVICES.map(item=>({item,kind:'Рабочий сервис',type:'service'})),...HELP.map(item=>({item,kind:'Помощь',type:'help'}))].map(result=>({...result,score:searchScore(result.item,query)})).filter(result=>result.score>0).sort((a,b)=>b.score-a.score);
    $('search-count').textContent=`Найдено: ${results.length}`;
    $('results-list').innerHTML=results.length?results.map(({item,kind,type})=>`<article class="result"><div><small>${kind}</small><h3>${item.title}</h3><p>${item.hint||item.summary||item.text}</p></div>${type==='task'?`<button type="button" data-open-task="${item.id}">Открыть шаг →</button>`:type==='article'?`<button type="button" data-open-article="${item.id}">Читать подробнее →</button>`:external(item.action,item.url)}</article>`).join(''):'<div class="empty-state"><h3>Пока ничего не нашли</h3><p>Попробуйте короче: «скидка», «расписание», «кадры» или «Moodle».</p><button type="button" class="button secondary" data-show-help>Перейти к помощи</button></div>';
    showView(currentView);
  }
  function clearSearch() { $('search').value='';$('clear-search').hidden=true;showView(currentView); }
  function guideFilter() {
    const category=$('guide-category').value;
    let count=0;
    GUIDE_CATEGORIES.forEach(([id])=>{const visible=category==='all'||category===id;$(`guide-group-${id}`).hidden=!visible;if(visible)count+=ARTICLES.filter(article=>article.category===id).length;});
    $('guide-count').textContent=`Тем: ${count}`;
  }
  function navigate(initial=false) {
    const hash=location.hash.slice(1);
    if(hash.startsWith('guide/')) {
      const article=ARTICLES.find(item=>item.id===hash.slice(6));
      clearSearch();showView('guide');$('guide-category').value='all';guideFilter();
      if(!article){toast('Тема не найдена. Выберите раздел памятки.');return;}
      const row=$(`article-${article.id}`);row.open=true;row.scrollIntoView({block:'start'});row.querySelector('summary').focus({preventScroll:true});return;
    }
    if(hash==='sources') {
      clearSearch();showView('guide');$('source-method').open=true;$('source-method').scrollIntoView({block:'start'});$('source-method').querySelector('summary').focus({preventScroll:true});return;
    }
    if(hash.startsWith('step/')) {
      const id=hash.slice(5), task=TASKS.find(item=>item.id===id);
      if(!task){showView('route');toast('Такой шаг не найден. Выберите задачу в маршруте.');return;}
      clearSearch();stage='all';$('remaining-only').checked=false;filters();showView('route');
      const row=$(`task-${id}`);row.open=true;row.scrollIntoView({block:'center'});row.querySelector('summary').focus({preventScroll:true});return;
    }
    if(hash==='search') {showView(currentView);$('workspace').scrollIntoView();$('search').focus({preventScroll:true});return;}
    if(hash==='workspace') {$('workspace').scrollIntoView();$('search').focus({preventScroll:true});return;}
    clearSearch();showView(['guide','services','help'].includes(hash)?hash:'route');
    if(!initial&&hash)$('workspace').scrollIntoView();
  }

  $('task-list').innerHTML=GROUPS.map((group,i)=>`<section class="task-group" id="group-${i}" aria-labelledby="group-title-${i}"><div class="group-heading"><span>0${i+1}</span><h3 id="group-title-${i}">${group}</h3><small id="group-progress-${i}"></small></div>${TASKS.filter(task=>task.stage===i).map(task=>`<details class="task" id="task-${task.id}"><summary><span class="task-icon">${icon(task.icon)}</span><span class="task-title"><strong>${task.title}</strong><small>${task.hint}</small></span><span class="task-state"></span><svg class="chevron" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></summary><div class="task-body"><p>${task.intro}</p><ol>${task.steps.map(step=>`<li>${step}</li>`).join('')}</ol><p class="task-result"><strong>Результат шага:</strong> ${task.result}</p><div class="task-links">${task.links.map(([title,url])=>external(title,url,'button secondary')).join('')}</div><label class="task-complete"><input type="checkbox" data-complete="${task.id}" aria-label="Отметить шаг: ${task.title}"><span class="completion-label">Отметить как выполненный</span></label></div></details>`).join('')}</section>`).join('');
  $('services-list').innerHTML=SERVICES.map(item=>`<article class="service"><span class="service-icon">${icon(item.icon)}</span><h3>${item.title}</h3><p>${item.text}</p>${external(item.action,item.url)}</article>`).join('');
  $('help-list').innerHTML=HELP.map(item=>`<article class="help-item">${icon(item.icon)}<div><h3>${item.title}</h3><p>${item.text}</p></div><div class="help-contact"><strong>${item.who}</strong>${item.contact?`<p>${item.contact.name}<br>${item.contact.office}<br>${item.contact.phone}, вн. ${item.contact.extension}</p><div class="contact-actions">${external("Позвонить","tel:"+item.contact.tel)}${external("Написать","mailto:"+item.contact.email)}</div>`:""}${external(item.action,item.url)}${(item.links||[]).map(([label,url])=>external(label,url)).join("")}</div></article>`).join('');
  $('guide-total').textContent=`${ARTICLES.length} тем · ${GUIDE_CATEGORIES.length} разделов`;
  $('guide-category').innerHTML='<option value="all">Все разделы</option>'+GUIDE_CATEGORIES.map(([id,title])=>`<option value="${id}">${title}</option>`).join('');
  $('guide-list').innerHTML=GUIDE_CATEGORIES.map(([id,title])=>`<section class="guide-group" id="guide-group-${id}" aria-labelledby="guide-heading-${id}"><h3 id="guide-heading-${id}">${title}</h3>${ARTICLES.filter(article=>article.category===id).map(article=>`<details class="guide-article" id="article-${article.id}"><summary><span><strong>${article.title}</strong><small>${article.summary}</small></span><svg class="chevron" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></summary><div class="article-body">${article.blocks.map(block=>`<h4>${block.title}</h4><ul>${block.items.map(text=>`<li>${text}</li>`).join('')}</ul>`).join('')}<div class="task-links article-actions">${(article.id==='it-instructions'?[['Контакты IT без входа',GUIDE_SOURCES.directory]]:article.links.slice(0,1)).map(([label,url])=>external(label,url,'button secondary')).join('')}${['mail-guide','moodle-guide','tandem-guide','directum-guide','it-instructions'].includes(article.id)?external('Помощь со входом','#help','button secondary'):''}</div><details class="article-evidence"><summary>Источники</summary><p>${GUIDE_STATUS[article.status].label} · ${GUIDE_CHECKED}</p><div class="task-links">${article.links.map(([label,url])=>external(label,url,'button secondary')).join('')}</div><a class="text-link" href="#sources">Бумажная памятка <span aria-hidden="true">→</span></a></details></div></details>`).join('')}</section>`).join('');
  $('guide-category').addEventListener('change',guideFilter);
  guideFilter();
  TASKS.forEach(task=>{const body=$(`task-${task.id}`).querySelector('.task-body');const link=document.createElement('a');link.className='text-link guide-task-link';link.href=`#guide/${GUIDE_FOR_TASK[task.id]}`;link.textContent='Подробнее в памятке →';body.append(link);});
  document.querySelectorAll('[data-stage]').forEach(button=>button.addEventListener('click',()=>{stage=button.dataset.stage;filters();}));
  $('remaining-only').addEventListener('change',filters);
  $('show-completed').addEventListener('click',()=>{$('remaining-only').checked=false;filters();});
  $('search').addEventListener('input',search);
  $('clear-search').addEventListener('click',()=>{clearSearch();$('search').focus();});
  $('task-list').addEventListener('change',event=>{
    const id=event.target.dataset.complete;if(!id)return;
    if(event.target.checked)done.add(id);else done.delete(id);
    const saved=save();progress();filters();
    if($('remaining-only').checked)$('remaining-only').focus();
    toast(saved?(done.has(id)?'Шаг отмечен. Продолжайте в своём темпе.':'Отметка снята.'):'Отметка действует до закрытия страницы. Браузер не разрешил её сохранить.');
  });
  document.addEventListener('click',event=>{
    const articleButton=event.target.closest('[data-open-article]');
    if(articleButton){const hash=`#guide/${articleButton.dataset.openArticle}`;if(location.hash===hash)navigate();else location.hash=hash;return;}
    const taskButton=event.target.closest('[data-open-task]');
    if(taskButton){const hash=`#step/${taskButton.dataset.openTask}`;if(location.hash===hash)navigate();else location.hash=hash;return;}
    if(event.target.closest('[data-show-help]')){if(location.hash==='#help')navigate();else location.hash='help';return;}
    const sameLink=event.target.closest('a[href^="#"]');
    if(sameLink&&sameLink.getAttribute('href')===location.hash&&location.hash!=='#workspace'){event.preventDefault();navigate();}
  });
  $('reset-progress').addEventListener('click',()=>{
    if(!resetArmed){resetArmed=true;$('reset-progress').textContent='Нажмите ещё раз, чтобы сбросить';clearTimeout(resetTimer);resetTimer=setTimeout(()=>{resetArmed=false;$('reset-progress').textContent='Сбросить мои отметки ↺';},5000);return;}
    clearTimeout(resetTimer);resetArmed=false;done.clear();const saved=save();progress();filters();$('reset-progress').textContent='Сбросить мои отметки ↺';toast(saved?'Личные отметки сброшены.':'Отметки сброшены на странице. Сохранить изменение не удалось.');
  });
  window.addEventListener('hashchange',()=>navigate());
  window.addEventListener('storage',event=>{if(event.key===KEY||event.key===null){try{done=restoreProgress(event.newValue);progress();filters();}catch{toast('Не удалось прочитать обновлённые отметки. Ваш текущий маршрут сохранён на странице.');}}});
  progress();filters();navigate(true);
  if(storageFailed)toast('Не удалось прочитать отметки. Можно пользоваться маршрутом; сохранение зависит от настроек браузера.');
}
if(typeof document!=='undefined')boot();
