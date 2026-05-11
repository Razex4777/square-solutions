/**
 * Analytics Dashboard i18n — EN/AR translations
 * Each key has a `label` and optional `tooltip` for info icons.
 */

export type AnalyticsLocale = "en" | "ar";

export interface AnalyticsTranslations {
  dir: "ltr" | "rtl";
  nav: {
    title: string;
    updated: string;
    live: string;
    livePulse: string;
  };
  overview: {
    title: string;
    subtitle: string;
  };
  kpi: {
    totalSessions: { label: string; tooltip: string };
    pageviews: { label: string; tooltip: string };
    active24h: { label: string; tooltip: string };
    avgDuration: { label: string; tooltip: string };
    bounceRate: { label: string; tooltip: string };
    engagement: { label: string; tooltip: string };
  };
  charts: {
    sessionsOverTime: { label: string; tooltip: string };
    topLocations: { label: string; tooltip: string };
    engagement: { label: string; tooltip: string };
    newVsReturning: { label: string; tooltip: string };
    trafficSources: { label: string; tooltip: string };
    devices: { label: string; tooltip: string };
    browsers: { label: string; tooltip: string };
    trafficByHour: { label: string; tooltip: string };
    topPages: { label: string; tooltip: string };
    sectionPopularity: { label: string; tooltip: string };
    recentSessions: { label: string; tooltip: string };
  };
  engagement: {
    engagementRate: string;
    pagesPerSession: string;
    avgDuration: string;
    totalEvents: string;
  };
  visitors: {
    new: string;
    returning: string;
  };
  referrer: {
    direct: string;
  };
  table: {
    views: string;
    country: string;
    device: string;
    browser: string;
    started: string;
    duration: string;
    noData: string;
  };
  timeRange: {
    today: string;
    last7: string;
    last30: string;
    last90: string;
    custom: string;
  };
  newsletter: {
    title: string;
    tooltip: string;
    total: string;
    active: string;
    thisWeek: string;
    thisMonth: string;
    email: string;
    subscribedAt: string;
    status: string;
    source: string;
    activeStatus: string;
    inactiveStatus: string;
    noSubscribers: string;
    loading: string;
  };
}

export const analyticsTranslations: Record<AnalyticsLocale, AnalyticsTranslations> = {
  en: {
    dir: "ltr",
    nav: {
      title: "Analytics",
      updated: "Updated",
      live: "live",
      livePulse: "LIVE",
    },
    overview: {
      title: "Overview",
      subtitle: "Your website performance at a glance",
    },
    kpi: {
      totalSessions: {
        label: "Total Sessions",
        tooltip: "Number of unique browsing sessions during the selected period. Each tab/visit creates one session.",
      },
      pageviews: {
        label: "Pageviews",
        tooltip: "Total pages loaded by all visitors. One visitor can generate multiple pageviews.",
      },
      active24h: {
        label: "Active (24h)",
        tooltip: "Unique visitors who were active on your site in the last 24 hours.",
      },
      avgDuration: {
        label: "Avg. Duration",
        tooltip: "Average time visitors spend on your site per session before leaving.",
      },
      bounceRate: {
        label: "Bounce Rate",
        tooltip: "Percentage of sessions where the visitor viewed only one page and left without interaction.",
      },
      engagement: {
        label: "Engagement",
        tooltip: "Percentage of sessions with meaningful interaction (viewed 2+ pages or spent 10+ seconds).",
      },
    },
    charts: {
      sessionsOverTime: {
        label: "Sessions Over Time",
        tooltip: "Daily session counts showing traffic trends over the selected period.",
      },
      topLocations: {
        label: "Top Locations",
        tooltip: "Countries with the most visitors based on IP geolocation.",
      },
      engagement: {
        label: "Engagement",
        tooltip: "Detailed engagement metrics measuring how users interact with your content.",
      },
      newVsReturning: {
        label: "New vs Returning",
        tooltip: "Split between first-time visitors and those who have visited before.",
      },
      trafficSources: {
        label: "Traffic Sources",
        tooltip: "Where your visitors come from: search engines, social media, direct links, or referral sites.",
      },
      devices: {
        label: "Devices",
        tooltip: "Mobile vs Desktop vs Tablet breakdown of your audience.",
      },
      browsers: {
        label: "Browsers",
        tooltip: "Which web browsers your visitors use (Chrome, Safari, Firefox, etc.).",
      },
      trafficByHour: {
        label: "Traffic by Hour",
        tooltip: "Session distribution across 24 hours — find your peak traffic times.",
      },
      topPages: {
        label: "Top Pages",
        tooltip: "Most visited pages on your website ranked by view count.",
      },
      sectionPopularity: {
        label: "Sections Scrolled",
        tooltip: "Which page sections users scroll to and view. Tracks when 30% of a section becomes visible.",
      },
      recentSessions: {
        label: "Recent Sessions",
        tooltip: "The latest visitor sessions with country, device, and duration details.",
      },
    },
    engagement: {
      engagementRate: "Engagement Rate",
      pagesPerSession: "Pages / Session",
      avgDuration: "Avg. Duration",
      totalEvents: "Total Events",
    },
    visitors: {
      new: "New",
      returning: "Returning",
    },
    referrer: {
      direct: "Direct",
    },
    table: {
      views: "views",
      country: "Country",
      device: "Device",
      browser: "Browser",
      started: "Started",
      duration: "Duration",
      noData: "No data yet",
    },
    timeRange: {
      today: "Today",
      last7: "7 days",
      last30: "30 days",
      last90: "90 days",
      custom: "Custom",
    },
    newsletter: {
      title: "Newsletter Subscribers",
      tooltip: "People who subscribed to your newsletter via the website form.",
      total: "Total",
      active: "Active",
      thisWeek: "This Week",
      thisMonth: "This Month",
      email: "Email",
      subscribedAt: "Subscribed",
      status: "Status",
      source: "Source",
      activeStatus: "Active",
      inactiveStatus: "Inactive",
      noSubscribers: "No subscribers yet",
      loading: "Loading subscribers...",
    },
  },
  ar: {
    dir: "rtl",
    nav: {
      title: "التحليلات",
      updated: "آخر تحديث",
      live: "متصل",
      livePulse: "مباشر",
    },
    overview: {
      title: "نظرة عامة",
      subtitle: "أداء موقعك في لمحة سريعة",
    },
    kpi: {
      totalSessions: {
        label: "إجمالي الجلسات",
        tooltip: "عدد جلسات التصفح الفريدة خلال الفترة المحددة. كل زيارة أو تبويب ينشئ جلسة واحدة.",
      },
      pageviews: {
        label: "مشاهدات الصفحات",
        tooltip: "إجمالي الصفحات التي تم تحميلها. زائر واحد يمكن أن ينتج عدة مشاهدات.",
      },
      active24h: {
        label: "نشط (24 ساعة)",
        tooltip: "الزوار الفريدون الذين كانوا نشطين على موقعك خلال آخر 24 ساعة.",
      },
      avgDuration: {
        label: "متوسط المدة",
        tooltip: "متوسط الوقت الذي يقضيه الزوار في موقعك لكل جلسة قبل المغادرة.",
      },
      bounceRate: {
        label: "معدل الارتداد",
        tooltip: "نسبة الجلسات التي شاهد فيها الزائر صفحة واحدة فقط وغادر بدون تفاعل.",
      },
      engagement: {
        label: "معدل التفاعل",
        tooltip: "نسبة الجلسات ذات التفاعل الحقيقي (مشاهدة صفحتين أو أكثر أو قضاء 10 ثوانٍ فأكثر).",
      },
    },
    charts: {
      sessionsOverTime: {
        label: "الجلسات عبر الزمن",
        tooltip: "عدد الجلسات اليومية لإظهار اتجاهات حركة المرور خلال الفترة المحددة.",
      },
      topLocations: {
        label: "أكثر المواقع",
        tooltip: "الدول التي لديها أكبر عدد من الزوار بناءً على تحديد الموقع الجغرافي.",
      },
      engagement: {
        label: "التفاعل",
        tooltip: "مقاييس تفاعل تفصيلية توضح كيف يتفاعل المستخدمون مع المحتوى.",
      },
      newVsReturning: {
        label: "جدد مقابل عائدين",
        tooltip: "التقسيم بين الزوار الجدد لأول مرة والذين زاروا الموقع سابقاً.",
      },
      trafficSources: {
        label: "مصادر الزيارات",
        tooltip: "من أين يأتي زوارك: محركات البحث، وسائل التواصل الاجتماعي، روابط مباشرة، أو مواقع إحالة.",
      },
      devices: {
        label: "الأجهزة",
        tooltip: "توزيع الزوار حسب نوع الجهاز: موبايل، سطح المكتب، أو تابلت.",
      },
      browsers: {
        label: "المتصفحات",
        tooltip: "المتصفحات التي يستخدمها زوارك (كروم، سفاري، فايرفوكس، إلخ).",
      },
      trafficByHour: {
        label: "الزيارات حسب الساعة",
        tooltip: "توزيع الجلسات على مدار 24 ساعة — اكتشف أوقات ذروة الزيارات.",
      },
      topPages: {
        label: "أكثر الصفحات زيارة",
        tooltip: "الصفحات الأكثر زيارة في موقعك مرتبة حسب عدد المشاهدات.",
      },
      sectionPopularity: {
        label: "الأقسام المتصفحة",
        tooltip: "الأقسام التي يتصفحها الزوار ويشاهدونها. يتم التتبع عند ظهور 30% من القسم.",
      },
      recentSessions: {
        label: "الجلسات الأخيرة",
        tooltip: "آخر جلسات الزوار مع تفاصيل الدولة والجهاز والمدة.",
      },
    },
    engagement: {
      engagementRate: "معدل التفاعل",
      pagesPerSession: "صفحات / جلسة",
      avgDuration: "متوسط المدة",
      totalEvents: "إجمالي الأحداث",
    },
    visitors: {
      new: "جديد",
      returning: "عائد",
    },
    referrer: {
      direct: "مباشر",
    },
    table: {
      views: "مشاهدات",
      country: "الدولة",
      device: "الجهاز",
      browser: "المتصفح",
      started: "بدأ",
      duration: "المدة",
      noData: "لا توجد بيانات بعد",
    },
    timeRange: {
      today: "اليوم",
      last7: "7 أيام",
      last30: "30 يوم",
      last90: "90 يوم",
      custom: "مخصص",
    },
    newsletter: {
      title: "مشتركو النشرة الإخبارية",
      tooltip: "الأشخاص الذين اشتركوا في النشرة الإخبارية عبر نموذج الموقع.",
      total: "الإجمالي",
      active: "نشط",
      thisWeek: "هذا الأسبوع",
      thisMonth: "هذا الشهر",
      email: "البريد الإلكتروني",
      subscribedAt: "تاريخ الاشتراك",
      status: "الحالة",
      source: "المصدر",
      activeStatus: "نشط",
      inactiveStatus: "غير نشط",
      noSubscribers: "لا يوجد مشتركون بعد",
      loading: "جاري تحميل المشتركين...",
    },
  },
};
