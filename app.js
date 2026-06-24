const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

const translations = {
  nl: {
    appName: 'Eenvoudige Mobiele App',
    brand: 'Health App',
    themeToggleLabel: 'Thema wisselen',
    languageToggleLabel: 'Switch to English',
    navigation: {
      home: 'Home',
      dashboard: 'Dashboard',
      overzicht: 'Overzicht',
      invoer: 'Invoer'
    },
    home: {
      title: 'Home',
      heading: 'Mijn Gezondheid',
      intro: 'Home pagina van Mijn Gezondheid',
      cards: [
        {
          title: 'Data Invoeren',
          text: 'Voer eenvoudig je dagelijkse gezondheidsgegevens in, zoals je gewicht, slaapuren of waterinname.'
        },
        {
          title: 'Overzicht',
          text: 'Bekijk je voortgang in een duidelijk overzicht. Filter je data per dag, week of maand.'
        },
        {
          title: 'Offline Gebruik',
          text: 'De app is ook offline te gebruiken. Je gegevens worden lokaal opgeslagen.'
        }
      ]
    },
    dashboard: {
      title: 'Dashboard',
      heading: 'Dashboard',
      intro: 'Overzicht over je activiteiten.',
      overviewHeading: 'Overzicht',
      overviewText: 'Om te bekijken wat je allemaal hebt gedaan ga hierheen.',
      overviewLinkLabel: 'Naar overzicht',
      itemsHeading: 'Gezondheidsitems',
      itemsText: 'Voeg hier je items toe.',
      itemsLinkLabel: 'Naar invoer'
    },
    overzicht: {
      title: 'Overzicht',
      heading: 'Overzicht',
      intro: 'Pagina van alle activiteiten.',
      periodButtons: {
        day: 'Dag',
        week: 'Week',
        month: 'Maand'
      },
      periodLabels: {
        day: 'dag',
        week: 'week',
        month: 'maand'
      },
      emptyState: 'Er zijn nog geen gegevens. Voeg items toe via de invoerpagina.',
      savedActivities: 'Opgeslagen activiteiten',
      totalLabel: 'Totaal ({period})',
      noFilter: 'geen filter',
      deleteButton: 'Verwijder',
      deleteConfirm: 'Weet je zeker dat je dit item wilt verwijderen?',
      categories: {
        voeding: 'Voeding',
        conditie: 'Conditie',
        slaap: 'Slaap'
      }
    },
    invoer: {
      title: 'Invoer',
      heading: 'Gezondheidsitem toevoegen',
      intro: 'Voeg hier een nieuw gezondheidsitem toe aan je logboek.',
      eyebrow: 'Pagina 4',
      date: 'Datum',
      category: 'Categorie',
      chooseCategory: 'Kies een categorie',
      description: 'Omschrijving',
      descriptionPlaceholder: 'bv. Lunch, Hardlopen, etc.',
      value: 'Waarde (kcal, km, uren)',
      submit: 'Toevoegen',
      categories: {
        voeding: 'Voeding',
        conditie: 'Conditie',
        slaap: 'Slaap'
      }
    },
    notFound: {
      title: '404',
      heading: 'Pagina niet gevonden',
      intro: 'Deze route bestaat nog niet in de eerste Node.js-opzet.',
      eyebrow: 'Fout 404',
      button: 'Terug naar home'
    }
  },
  en: {
    appName: 'Simple Mobile App',
    brand: 'Health App',
    themeToggleLabel: 'Switch theme',
    languageToggleLabel: 'Schakel naar Nederlands',
    navigation: {
      home: 'Home',
      dashboard: 'Dashboard',
      overzicht: 'Overview',
      invoer: 'Entry'
    },
    home: {
      title: 'Home',
      heading: 'My Health',
      intro: 'Home page of My Health',
      cards: [
        {
          title: 'Enter data',
          text: 'Add daily health data easily, such as your weight, sleep hours, or water intake.'
        },
        {
          title: 'Overview',
          text: 'Track your progress in a clear overview. Filter your data by day, week, or month.'
        },
        {
          title: 'Offline use',
          text: 'The app also works offline. Your data is stored locally.'
        }
      ]
    },
    dashboard: {
      title: 'Dashboard',
      heading: 'Dashboard',
      intro: 'Overview of your activities.',
      overviewHeading: 'Overview',
      overviewText: 'Go here to see everything you have done.',
      overviewLinkLabel: 'Open overview',
      itemsHeading: 'Health items',
      itemsText: 'Add your items here.',
      itemsLinkLabel: 'Open entry form'
    },
    overzicht: {
      title: 'Overview',
      heading: 'Overview',
      intro: 'Page with all activities.',
      periodButtons: {
        day: 'Day',
        week: 'Week',
        month: 'Month'
      },
      periodLabels: {
        day: 'day',
        week: 'week',
        month: 'month'
      },
      emptyState: 'There is no data yet. Add items through the entry page.',
      savedActivities: 'Saved activities',
      totalLabel: 'Total ({period})',
      noFilter: 'no filter',
      deleteButton: 'Delete',
      deleteConfirm: 'Are you sure you want to delete this item?',
      categories: {
        voeding: 'Food',
        conditie: 'Condition',
        slaap: 'Sleep'
      }
    },
    invoer: {
      title: 'Entry',
      heading: 'Add health item',
      intro: 'Add a new health item to your logbook here.',
      eyebrow: 'Page 4',
      date: 'Date',
      category: 'Category',
      chooseCategory: 'Choose a category',
      description: 'Description',
      descriptionPlaceholder: 'e.g. Lunch, Running, etc.',
      value: 'Value (kcal, km, hours)',
      submit: 'Add item',
      categories: {
        voeding: 'Food',
        conditie: 'Condition',
        slaap: 'Sleep'
      }
    },
    notFound: {
      title: '404',
      heading: 'Page not found',
      intro: 'This route does not exist in the first Node.js setup yet.',
      eyebrow: 'Error 404',
      button: 'Back to home'
    }
  }
};

app.get('/', (request, response) => {
  renderPage(response, request, 'home', '/');
});

app.get('/dashboard', (request, response) => {
  renderPage(response, request, 'dashboard', '/dashboard');
});

app.get('/overzicht', (request, response) => {
  renderPage(response, request, 'overzicht', '/overzicht');
});

app.get('/invoer', (request, response) => {
  renderPage(response, request, 'invoer', '/invoer');
});

app.get('/health', (request, response) => {
  response.json({
    status: 'ok',
    app: 'Eenvoudige Mobiele App Node.js startproject'
  });
});

app.use((request, response) => {
  const lang = getLanguage(request);
  const copy = translations[lang];
  const page = buildPageCopy(copy.notFound, lang, request.path, 'notFound');

  response.status(404).render('pages/not-found', {
    lang,
    appName: copy.appName,
    page,
    pageCopy: page,
    navigation: getNavigation(request.path, lang),
    languageToggle: getLanguageToggle(request.path, lang),
    i18n: getCommonI18n(lang)
  });
});

function renderPage(response, request, pageKey, activePath) {
  const lang = getLanguage(request);
  const copy = translations[lang];
  const page = buildPageCopy(copy[pageKey], lang, activePath, pageKey);

  response.render(`pages/${pageKey}`, {
    lang,
    appName: copy.appName,
    page,
    pageCopy: page,
    navigation: getNavigation(activePath, lang),
    languageToggle: getLanguageToggle(activePath, lang),
    i18n: getCommonI18n(lang)
  });
}

function buildPageCopy(page, lang, activePath, pageKey) {
  if (pageKey === 'dashboard') {
    return {
      ...page,
      overviewHref: withLang('/overzicht', lang),
      itemsHref: withLang('/invoer', lang)
    };
  }

  if (pageKey === 'invoer') {
    return {
      ...page,
      overviewHref: withLang('/overzicht', lang)
    };
  }

  if (pageKey === 'notFound') {
    return {
      ...page,
      homeHref: withLang('/', lang)
    };
  }

  return page;
}

function getNavigation(activePath, lang) {
  const copy = translations[lang];

  return [
    { href: withLang('/', lang), label: copy.navigation.home, active: activePath === '/' },
    { href: withLang('/dashboard', lang), label: copy.navigation.dashboard, active: activePath === '/dashboard' },
    { href: withLang('/overzicht', lang), label: copy.navigation.overzicht, active: activePath === '/overzicht' },
    { href: withLang('/invoer', lang), label: copy.navigation.invoer, active: activePath === '/invoer' }
  ];
}

function getLanguage(request) {
  const queryLanguage = normalizeLanguage(request.query.lang);

  if (queryLanguage) {
    return queryLanguage;
  }

  const cookies = parseCookies(request.headers.cookie || '');
  return normalizeLanguage(cookies.lang) || 'nl';
}

function getCommonI18n(lang) {
  const copy = translations[lang];

  return {
    themeToggleLabel: copy.themeToggleLabel,
    brand: copy.brand,
    language: lang
  };
}

function getLanguageToggle(activePath, lang) {
  const nextLanguage = lang === 'nl' ? 'en' : 'nl';
  const copy = translations[lang];

  return {
    href: withLang(activePath, nextLanguage),
    label: nextLanguage.toUpperCase(),
    ariaLabel: copy.languageToggleLabel
  };
}

function withLang(pathname, lang) {
  const separator = pathname.includes('?') ? '&' : '?';
  return `${pathname}${separator}lang=${lang}`;
}

function normalizeLanguage(language) {
  if (language === 'en' || language === 'nl') {
    return language;
  }

  return null;
}

function parseCookies(cookieHeader) {
  return cookieHeader.split(';').reduce((cookies, cookie) => {
    const [rawName, ...rawValueParts] = cookie.trim().split('=');

    if (!rawName) {
      return cookies;
    }

    cookies[decodeURIComponent(rawName)] = decodeURIComponent(rawValueParts.join('='));
    return cookies;
  }, {});
}

app.listen(port, () => {
  console.log(`Server draait op http://localhost:${port}`);
});
