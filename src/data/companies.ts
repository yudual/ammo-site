export type CompanyOwnership = '国企' | '民企' | '外企' | '创业公司' | '待核对'

export type WorkSchedule = '双休' | '大小周' | '单休' | '待核对'

export type VerificationStatus = '已核验' | '部分核验' | '过期待复查'

export type RelevanceLevel = '高' | '中' | '低' | '待核对'

export type CompanyResearchSource = {
  title: string
  type: string
  date: string
  url: string
}

export type CompanyLink = {
  title: string
  type:
    | '官网'
    | '招聘入口'
    | '招聘公告'
    | '公众号'
    | '抖音号'
    | '视频号'
    | '新闻资料'
    | '政府资料'
    | '学校就业网'
    | '其他'
  url: string
  note?: string
}

export type CompanyResearchTrace = {
  round: number
  queries: string[]
  usefulFindings: string[]
  gaps: string[]
}

export type CompanyResearch = {
  updatedAt: string
  status: string
  relevanceLevel: Exclude<RelevanceLevel, '待核对'>
  conclusion: string
  keySignals: string[]
  suitableFor: string[]
  risks: string[]
  sources: CompanyResearchSource[]
  searchTrace?: CompanyResearchTrace[]
}

export type CompanyVerification = {
  status: VerificationStatus
  relevanceLevel: RelevanceLevel
  updatedAt: string
  summary: string
  verifiedFields: string[]
  pendingFields: string[]
}

export type Company = {
  id: number
  name: string
  ownership: CompanyOwnership
  city: string
  region: string
  salaryRange: string
  schedule: WorkSchedule
  scaleOrIndustry: string
  highlights: string[]
  positions: string
  education: string
  website: string
  links: CompanyLink[]
  description: string
  verification: CompanyVerification
  research?: CompanyResearch
}

export const companyOwnershipOptions: CompanyOwnership[] = [
  '国企',
  '民企',
  '外企',
  '创业公司',
  '待核对',
]

export const companies: Company[] = [
  {
    id: 1,
    name: '中国兵器工业集团北方特种能源有限公司',
    ownership: '国企',
    city: '西安',
    region: '高新区',
    salaryRange: '7k-11k（历史岗位样本，待核对）',
    schedule: '待核对',
    scaleOrIndustry: '兵工体系 / 火工品与民爆器材',
    highlights: ['兵工体系', '火工品相关', '历史招聘样本'],
    positions: '弹药研发、试验验证、工艺工程、质量管理等历史岗位样本',
    education: '本科及以上（历史岗位样本，待核对）',
    website: 'https://www.norincogroup.com.cn',
    links: [
      {
        title: '中国兵器工业集团有限公司官网',
        type: '官网',
        url: 'https://www.norincogroup.com.cn',
        note: '集团官网，招聘主体需继续核对（待核对）。',
      },
      {
        title: '西安庆华民爆公司2025年校园招聘公告',
        type: '招聘公告',
        url: 'https://m.xa.bendibao.com/job/133239.shtm',
        note: '岗位与薪资样本（待核对）。',
      },
      {
        title: '中国兵器北方特种能源集团有限公司招聘公告',
        type: '招聘公告',
        url: 'https://m.xa.bendibao.com/job/131667.shtm',
        note: '历史招聘公告（待核对）。',
      },
    ],
    description: '兵器工业集团下属企业，做火工品、民爆器材和含能材料。',
    verification: {
      status: '部分核验',
      relevanceLevel: '高',
      updatedAt: '2026-06-08',
      summary: '已根据公开招聘信息和资料入口确认部分相关性，但薪资、作息、签约单位和具体岗位仍需核对最新校招公告。',
      verifiedFields: [
        '企业性质与集团背景',
        '业务方向与火工品、含能材料、民爆器材等领域存在关联',
        '公开资料中出现过弹药研发、试验验证、工艺工程等历史岗位样本',
        '已有可追溯来源链接',
      ],
      pendingFields: [
        '具体签约单位和实际工作地点',
        '薪资范围（7k-11k 仅为历史岗位样本，待核对最新公告）',
        '作息与班制',
        '当年开放岗位和学历要求',
      ],
    },
    research: {
      updatedAt: '2026-06-04',
      status: '公开资料较多，但具体岗位、薪资和工作地点需要核对最新校招公告。',
      relevanceLevel: '高',
      conclusion:
        '北方特种能源做火工品、含能材料、民爆器材和爆破工程，军工体系内岗位偏研发试验、工艺制造和安全技术。集团下属单位分散，签约主体、工作地点和岗位要单独核对，历史岗位样本薪资约 7k-11k（待核对）。',
      keySignals: [
        '业务方向与火工品、含能材料、民爆器材等领域相关。',
        '公开资料中出现过火工品、火炸药、弹药技术员、爆破工程师等相关岗位。',
        '集团和下属单位分布较广，具体工作地点需要单独核对。',
        '本科可关注工艺、生产、安全和现场技术岗位，硕士及以上更适合研发方向。',
        '不同子公司之间工作内容、待遇和地点可能差异较大。',
      ],
      suitableFor: [
        '想进入军工或民爆相关体系发展的学生。',
        '能接受工程、工艺、试验或现场类岗位的学生。',
        '关注含能材料、火工品、爆破工程、安全技术方向的学生。',
      ],
      risks: [
        '具体签约单位可能不是集团总部，需要确认底层法人和实际工作地点。',
        '薪资、作息和岗位内容（待核对），投递前向招聘联系人确认。',
        '部分岗位可能涉及涉密要求、偏远厂区或倒班，需要面试时主动确认。',
      ],
      sources: [
        {
          title: '西安庆华民爆公司2025年校园招聘公告',
          type: '招聘公告',
          date: '2024-09-23',
          url: 'https://m.xa.bendibao.com/job/133239.shtm',
        },
        {
          title: '中国兵器北方特种能源集团有限公司招聘公告',
          type: '招聘公告',
          date: '2024-08-06',
          url: 'https://m.xa.bendibao.com/job/131667.shtm',
        },
        {
          title: '陕西应用物理化学研究所2026年校园招聘信息',
          type: '招聘公告',
          date: '2026',
          url: 'https://www.gaoxiaojob.com/announcement/detail/345293.html',
        },
        {
          title: '北方特种能源集团有限公司2026年人才招聘引进专区',
          type: '招聘入口',
          date: '2026',
          url: 'https://www.gaoxiaojob.com/company/detail/100949.html',
        },
        {
          title: '西安工业大学就业网：陕西北方民爆集团有限公司招聘信息',
          type: '学校就业网',
          date: '2026-06-08访问',
          url: 'https://xagydx.bysjy.com.cn/detail/company?company_id=269649',
        },
      ],
    },
  },
  {
    id: 2,
    name: '中国兵器装备集团自动化研究所有限公司',
    ownership: '国企',
    city: '绵阳',
    region: '游仙区',
    salaryRange: '未知',
    schedule: '待核对',
    scaleOrIndustry: '军工研究所 / 智能装备与智能制造',
    highlights: ['自动装药线索', '智能制造', '绵阳'],
    positions: '软件开发、硬件设计、机械设计、电气设计、AI技术开发',
    education: '硕士岗位较多，具体要求待核对',
    website: 'http://www.58suo.com',
    links: [
      {
        title: '中国兵器装备集团自动化研究所有限公司官网',
        type: '官网',
        url: 'http://www.58suo.com',
      },
      {
        title: '四川招聘网企业详情',
        type: '招聘入口',
        url: 'https://www.scrcjob.com/index/company/company.html?id=159428',
        note: '企业信息和招聘入口样本。',
      },
      {
        title: '泉州分公司2024年公开招聘公告',
        type: '招聘公告',
        url: 'https://www.gaoxiaojob.com/announcement/detail/228479.html',
        note: '分公司历史招聘公告。',
      },
    ],
    description: '兵装集团下属自动化研究所，方向偏装备智能化和智能制造。',
    verification: {
      status: '部分核验',
      relevanceLevel: '高',
      updatedAt: '2026-06-08',
      summary: '已确认其智能制造、装备智能化和弹药自动装药平台，薪资、作息和当年岗位待核对。',
      verifiedFields: [
        '企业名称、所在地和国企背景',
        '涉及武器装备、智能制造、智能传感等方向',
        '涉及武器装备、智能制造、智能传感等方向',
        '公开招聘页面出现过软件开发、硬件设计、机械设计、电气设计等岗位',
      ],
      pendingFields: [
        '薪资范围（未知，待补充）',
        '作息与班制',
        '实际签约单位与最终工作地点',
        '当年面向本专业开放的岗位和学历要求',
      ],
    },
    research: {
      updatedAt: '2026-06-04',
      status: '公开资料较多，但具体岗位、薪资和作息需要核对最新校招公告。',
      relevanceLevel: '高',
      conclusion:
        '原兵器工业第五八研究所转制而来，做武器装备、智能制造、智能传感，建有弹药自动装药技术创新中心。岗位以装备智能化、智能制造和工程技术为主，硕士岗偏多；薪资、作息和签约单位（待核对）。',
      keySignals: [
        '公开资料提到国防科技工业弹药自动装药技术创新中心、中国兵器装备集团智能制造技术中心等平台线索。',
        '企业简介中提到武器装备、智能制造、智能传感、辐射监测等产业方向。',
        '招聘页面出现过软件开发、硬件设计、机械设计、电气设计、AI技术开发等岗位，部分岗位要求硕士学历。',
      ],
      suitableFor: [
        '关注弹药自动化制造、装药装备或智能制造方向的学生。',
        '愿意在军工科研院所或国企技术体系内发展的学生。',
        '计算机、自动化、机械、电气、人工智能等方向背景的学生。',
      ],
      risks: [
        '薪资、作息和福利没有统一可靠口径（待核对），面试时向企业方确认。',
        '不同部门、分支机构和项目组的工作内容可能差异较大，需要确认具体签约单位和工作地点。',
        '军工相关岗位可能涉及保密、外场、项目攻关或出差要求，需要面试时主动确认。',
      ],
      sources: [
        {
          title: '四川招聘网：中国兵器装备集团自动化研究所有限公司企业详情',
          type: '招聘入口',
          date: '2026',
          url: 'https://www.scrcjob.com/index/company/company.html?id=159428',
        },
        {
          title: '高校人才网：中国兵器装备集团自动化研究所有限公司泉州分公司2024年公开招聘公告',
          type: '招聘公告',
          date: '2024-06-28',
          url: 'https://www.gaoxiaojob.com/announcement/detail/228479.html',
        },
        {
          title: 'innoHere：中国兵器装备集团自动化研究所有限公司简介',
          type: '其他',
          date: '2026',
          url: 'https://www.innohere.com/ir/162517/general.html',
        },
        {
          title: '中国兵器装备集团自动化研究所有限公司官网',
          type: '官网',
          date: '2026-06-08访问',
          url: 'http://www.58suo.com',
        },
        {
          title: '四川省人力资源和社会保障厅：企业博士后科研工作站名单',
          type: '政府资料',
          date: '2020-08-04',
          url: 'https://rst.sc.gov.cn/rst/c101538/2020/8/4/c06683209efd48dab086a3533a0b9a4c/files/36117f64ff664feeb20d8f52f7b64683.pdf',
        },
      ],
    },
  },
    {
    "id": 3,
    "name": "易普力股份有限公司",
    "ownership": "国企",
    "city": "长沙",
    "region": "湖南",
    "salaryRange": "8k-10k/月（历史岗位样本，待核对）",
    "schedule": "待核对",
    "scaleOrIndustry": "民爆生产 / 爆破工程服务",
    "highlights": [
      "央企成员",
      "民爆产品",
      "爆破工程",
      "矿山服务",
      "历史校招样本"
    ],
    "positions": "化工技术岗、设备物资岗、安全管理等历史岗位样本",
    "education": "本科及以上（历史岗位样本，待核对）",
    "website": "http://www.expl.ceec.net.cn/",
    "links": [
      {
        "title": "易普力股份有限公司官网",
        "type": "官网",
        "url": "http://www.expl.ceec.net.cn/",
        "note": "企业官网，业务和企业主体核对入口。"
      },
      {
        "title": "国聘易普力公司主页",
        "type": "招聘入口",
        "url": "https://www.iguopin.com/company?id=10685332097715958",
        "note": "招聘入口样本，不能单独支撑薪资和作息。"
      },
      {
        "title": "中国能建易普力公司业务资料",
        "type": "新闻资料",
        "url": "https://www.ceec.net.cn/art/2025/7/21/art_11023_2536076.html",
        "note": "集团网站资料，用于辅助核对业务方向。"
      },
      {
        "title": "中国能建易普力公司公开招聘公告",
        "type": "招聘公告",
        "url": "https://cpnn.com.cn/news/zhaopinxinxi2023/202508/t20250825_1826598.html",
        "note": "2025年公开招聘线索，需核对是否仍有效。"
      },
      {
        "title": "中国石油大学就业信息网招聘简章",
        "type": "学校就业网",
        "url": "https://career.cup.edu.cn/campus/view/id/456630",
        "note": "历史校招样本，薪资和岗位不代表当前口径。"
      },
      {
        "title": "湖南石油化工职业技术学院：葛洲坝易普力股份有限公司招聘信息",
        "type": "学校就业网",
        "url": "https://www.hip.edu.cn/jz/info/1007/1398.htm",
        "note": "学校就业网 · 待核对"
      }
    ],
    "description": "民爆企业，业务涉及民爆产品和爆破工程服务。",
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "高",
      "updatedAt": "2026-06-07",
      "summary": "已核对官网、集团官网资料、招聘平台和历史校招样本，主营业务与民爆和爆破工程相关；最新岗位、薪资、作息和工作地点仍需复查。",
      "verifiedFields": [
        "企业名称、官网入口和中国能建体系相关线索",
        "民爆产品、爆破工程、矿山服务等业务方向",
        "历史招聘样本中出现化工技术、设备物资、安全管理等岗位线索",
        "部分历史岗位样本出现 8k-10k/月薪资区间"
      ],
      "pendingFields": [
        "2026届或最新校招、社招公告",
        "当前有效薪资范围和具体岗位薪资",
        "作息、集中休假、补贴和福利规则",
        "签约主体、常驻工作地点及项目部派驻情况"
      ]
    },
    "research": {
      "updatedAt": "2026-06-07",
      "status": "已核对官网、集团资料和历史招聘来源，当前招聘细节仍需复查。",
      "relevanceLevel": "高",
      "conclusion": "易普力属于中国能建体系，业务涉及民爆产品、爆破工程和矿山服务，对口弹药工程、安全工程。现有招聘多为历史公告或平台入口，岗位常落在生产、施工和矿服项目，薪资、作息和工作地点（待核对）。",
      "keySignals": [
        "官网和集团资料可支撑企业主体、业务板块和民爆工程方向判断。",
        "历史招聘样本中出现化工技术岗、设备物资岗、安全管理等岗位线索。",
        "8k-10k/月只来自历史岗位样本，不代表当前薪资口径。",
        "招聘平台可作为入口线索，但不能单独支撑作息、福利和长期岗位需求。"
      ],
      "suitableFor": [
        "关注民爆产品、爆破工程、矿山服务或安全管理方向的学生。",
        "能接受部分岗位可能涉及项目现场、矿山或工程施工环境的学生。",
        "专业背景与弹药工程、爆炸技术、安全工程或化学化工相关的毕业生。"
      ],
      "risks": [
        "最新校招和社招公告未完全核对，历史岗位样本可能已经过期。",
        "薪资样本来自历史招聘信息，实际薪资需按最新岗位和工作地点复核。",
        "作息、集中休假、补贴和福利没有形成可靠公开口径。",
        "签约主体和常驻地点可能因子公司、项目部或工程区域不同而变化。"
      ],
      "sources": [
        {
          "title": "易普力股份有限公司官网",
          "type": "官网",
          "date": "2026-06-07",
          "url": "http://www.expl.ceec.net.cn/"
        },
        {
          "title": "中国能建易普力公司业务资料",
          "type": "新闻资料",
          "date": "2025-07",
          "url": "https://www.ceec.net.cn/art/2025/7/21/art_11023_2536076.html"
        },
        {
          "title": "中国能建易普力公司公开招聘公告",
          "type": "招聘公告",
          "date": "2025-08",
          "url": "https://cpnn.com.cn/news/zhaopinxinxi2023/202508/t20250825_1826598.html"
        },
        {
          "title": "国聘易普力公司主页",
          "type": "招聘入口",
          "date": "待核对",
          "url": "https://www.iguopin.com/company?id=10685332097715958"
        },
        {
          "title": "中国石油大学就业信息网：易普力2025届校园招聘简章",
          "type": "学校就业网",
          "date": "2024-09",
          "url": "https://career.cup.edu.cn/campus/view/id/456630"
        },
        {
          "title": "湖南石油化工职业技术学院：葛洲坝易普力股份有限公司招聘信息",
          "type": "学校就业网",
          "date": "待核对",
          "url": "https://www.hip.edu.cn/jz/info/1007/1398.htm"
        }
      ],
      "searchTrace": [
        {
          "round": 1,
          "queries": [
            "易普力股份有限公司 官网",
            "中国能建 易普力 业务"
          ],
          "usefulFindings": [
            "企业官网和中国能建集团页面可访问，可用于核对主体和业务方向。",
            "业务涉及民爆产品、爆破工程和矿山服务。"
          ],
          "gaps": [
            "官网入口未直接形成最新校招、薪资和作息的可靠口径。"
          ]
        },
        {
          "round": 2,
          "queries": [
            "易普力 招聘公告",
            "易普力 校园招聘 薪资",
            "易普力 国聘 公司主页"
          ],
          "usefulFindings": [
            "找到国聘公司主页、2025公开招聘公告和学校就业网历史校招样本。",
            "历史样本可作为岗位和薪资线索，但不能代表当前招聘制度。"
          ],
          "gaps": [
            "未形成 2026 届最新岗位、作息、福利和常驻地点的强证据。"
          ]
        }
      ]
    }
  },
  {
    "id": 4,
    "name": "广东锡源爆破科技股份有限公司",
    "ownership": "民企",
    "city": "惠州",
    "region": "待核对",
    "salaryRange": "未知",
    "schedule": "待核对",
    "scaleOrIndustry": "爆破工程 / 民爆服务",
    "highlights": [
      "一级爆破资质",
      "爆破工程"
    ],
    "positions": "销售工程师、销售助理、储备干部、爆破技术岗",
    "education": "本科及以上（理工类优先）",
    "website": "http://www.xybaopo.com/",
    "links": [
      {
        "title": "广东锡源爆破科技股份有限公司官网",
        "type": "官网",
        "url": "http://www.xybaopo.com/"
      },
      {
        "title": "招聘加入页面",
        "type": "招聘入口",
        "url": "http://www.xybaopo.com/join_us.html"
      },
      {
        "title": "广东锡源爆破科技股份有限公司工商信息与公告PDF",
        "type": "其他",
        "url": "https://www.gdktzx.com/d/file/2023/02/9215241704930bf3ffc39782f0a3ce9b.xlsx",
        "note": "其他 · 待核对"
      },
      {
        "title": "广东锡源爆破科技股份有限公司2023秋季校招宣讲会信息",
        "type": "学校就业网",
        "url": "https://www.bluenav.org/info/1143/6401.htm",
        "note": "学校就业网 · 2023"
      },
      {
        "title": "百度百科-广东锡源爆破科技股份有限公司",
        "type": "其他",
        "url": "https://baike.baidu.com/item/%E5%B9%BF%E4%B8%9C%E9%94%A1%E6%BA%90%E7%88%86%E7%A0%B4%E7%A7%91%E6%8A%80%E8%82%A1%E4%BB%BD%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8/51278280",
        "note": "其他 · 待核对"
      },
      {
        "title": "广东冠中盈建设投资集团有限公司子公司介绍页面",
        "type": "其他",
        "url": "http://www.gzying.com/intro/12.html",
        "note": "其他 · 待核对"
      },
      {
        "title": "惠州市建筑业协会会员单位页",
        "type": "其他",
        "url": "https://www.hzcia.org/nd.jsp?id=180",
        "note": "其他 · 待核对"
      }
    ],
    "description": "提供爆破整体解决方案及技术服务，涉及爆破设计施工、安全评估等业务。",
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "高",
      "updatedAt": "2026-06-06",
      "summary": "已根据企业官网和历史校招样本核对爆破工程主营业务，但具体作息及最新薪资待遇仍需复核。",
      "verifiedFields": [
        "统一社会信用代码 91441300758340009Q",
        "国家一级爆破作业资质",
        "主营爆破设计施工、安全评估等爆破工程一体化业务",
        "曾用名广东锡源爆破工程有限公司及控股股东冠中盈集团"
      ],
      "pendingFields": [
        "具体作息制度与薪资待遇",
        "最新校招岗位及招录人数",
        "签约主体与实际常驻项目部地点差异"
      ]
    },
    "research": {
      "updatedAt": "2026-06-06",
      "status": "业务与爆破/安全工程相关，但最新校招简章及作息待遇待核对。",
      "relevanceLevel": "高",
      "conclusion": "主营爆破工程设计施工与安全评估，具有国家一级爆破作业资质，对口弹药工程、安全工程。历史校招储备干部要求理工科本科及以上，工作以项目现场为主，常驻地点随项目走；薪资、作息（待核对）。",
      "keySignals": [
        "拥有国家一级爆破作业资质，是首批广东省公安厅核发单位。",
        "控股股东为广东冠中盈建设投资集团有限公司，持股约52.58%。",
        "历史校招（2023届）曾面向理工类本科生招聘储备干部，要求爆破作业证件优先。",
        "官网和校招宣讲信息显示其主营业务偏爆破工程与安全评估。"
      ],
      "suitableFor": [
        "关注爆破工程、民爆服务、安全评估方向的同学。",
        "愿意在项目部现场或爆破工程一线发展的毕业生。",
        "持有爆破作业证件或愿意在岗考取相关资质的理工科学生。"
      ],
      "risks": [
        "薪资待遇及作息（双休/单休等）无官方明确公开数据，仅见面议，属于待核对状态。",
        "工作性质以项目部现场为主，可能会有出差、野外作业和一定的现场风险。",
        "“高新技术企业”“行政处罚记录”暂不作为强结论，需用官方名单、信用中国或正式文书复核。",
        "2025年终止新三板挂牌应单独核验来源，未核实前不要写进核心结论。"
      ],
      "sources": [
        {
          "title": "广东锡源爆破科技股份有限公司官网",
          "type": "官网",
          "date": "待核对",
          "url": "http://www.xybaopo.com/"
        },
        {
          "title": "广东锡源爆破科技股份有限公司工商信息与公告PDF",
          "type": "其他",
          "date": "待核对",
          "url": "https://www.gdktzx.com/d/file/2023/02/9215241704930bf3ffc39782f0a3ce9b.xlsx"
        },
        {
          "title": "广东锡源爆破科技股份有限公司2023秋季校招宣讲会信息",
          "type": "学校就业网",
          "date": "2023",
          "url": "https://www.bluenav.org/info/1143/6401.htm"
        },
        {
          "title": "百度百科-广东锡源爆破科技股份有限公司",
          "type": "其他",
          "date": "待核对",
          "url": "https://baike.baidu.com/item/%E5%B9%BF%E4%B8%9C%E9%94%A1%E6%BA%90%E7%88%86%E7%A0%B4%E7%A7%91%E6%8A%80%E8%82%A1%E4%BB%BD%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8/51278280"
        },
        {
          "title": "广东冠中盈建设投资集团有限公司子公司介绍页面",
          "type": "其他",
          "date": "待核对",
          "url": "http://www.gzying.com/intro/12.html"
        },
        {
          "title": "广东锡源爆破科技股份有限公司招聘加入页面",
          "type": "招聘入口",
          "date": "待核对",
          "url": "http://www.xybaopo.com/join_us.html"
        },
        {
          "title": "惠州市建筑业协会会员单位页",
          "type": "其他",
          "date": "待核对",
          "url": "https://www.hzcia.org/nd.jsp?id=180"
        }
      ],
      "searchTrace": [
        {
          "round": 1,
          "queries": [
            "锡源爆破有限公司",
            "广东锡源爆破科技股份有限公司",
            "锡源爆破有限公司 官网",
            "锡源爆破有限公司 统一社会信用代码",
            "锡源爆破有限公司 企业性质",
            "锡源爆破有限公司 集团"
          ],
          "usefulFindings": [
            "确认全称广东锡源爆破科技股份有限公司",
            "官网 http://www.xybaopo.com/",
            "由广东冠中盈集团控股，注册地在惠州"
          ],
          "gaps": [
            "校招岗位",
            "薪资及作息"
          ]
        },
        {
          "round": 2,
          "queries": [
            "锡源爆破有限公司 弹药",
            "锡源爆破有限公司 兵器",
            "锡源爆破有限公司 民爆",
            "锡源爆破有限公司 爆破工程",
            "锡源爆破有限公司 含能材料",
            "锡源爆破有限公司 火工品、安全工程",
            "锡源爆破有限公司 装备制造",
            "锡源爆破有限公司 招标 项目 政府"
          ],
          "usefulFindings": [
            "主营爆破工程设计施工、安全评估等，具有一级爆破资质；高新技术企业身份需另行核验"
          ],
          "gaps": [
            "具体岗位",
            "薪资"
          ]
        },
        {
          "round": 3,
          "queries": [
            "锡源爆破有限公司 校园招聘",
            "锡源爆破有限公司 2026校招",
            "锡源爆破有限公司 2025校招",
            "锡源爆破有限公司 招聘 岗位 学历",
            "锡源爆破有限公司 site:edu.cn 招聘",
            "锡源爆破有限公司 学校就业网",
            "锡源爆破有限公司 宣讲会"
          ],
          "usefulFindings": [
            "发现2023年历史校招储备干部岗位样本，要求理工类本科及以上"
          ],
          "gaps": [
            "最新公告",
            "薪资/作息"
          ]
        },
        {
          "round": 4,
          "queries": [
            "锡源爆破有限公司 薪资",
            "锡源爆破有限公司 双休",
            "锡源爆破有限公司 工作地点",
            "锡源爆破有限公司 项目部",
            "锡源爆破有限公司 招聘 待遇",
            "锡源爆破有限公司 公众号 招聘",
            "锡源爆破有限公司 抖音 招聘"
          ],
          "usefulFindings": [
            "销售岗位面议样本，工作地点在惠州、中山等地"
          ],
          "gaps": [
            "作息与福利"
          ]
        },
        {
          "round": 5,
          "queries": [
            "锡源爆破有限公司 企业性质",
            "锡源爆破有限公司 所在地",
            "锡源爆破有限公司 招聘 学历",
            "锡源爆破有限公司 招聘 薪资",
            "锡源爆破有限公司 招聘 双休 作息",
            "锡源爆破有限公司 校招 岗位 专业",
            "锡源爆破有限公司 招聘 化工 机械 安全 弹药 爆破"
          ],
          "usefulFindings": [
            "统一社会信用代码 91441300758340009Q",
            "控股股东冠中盈建设投资集团持股52.5767%"
          ],
          "gaps": [
            "薪资和作息无明确数据，仅为待核对"
          ]
        },
        {
          "round": 6,
          "queries": [
            "锡源爆破有限公司 统一社会信用代码 核实",
            "锡源爆破有限公司 官网招聘入口",
            "锡源爆破有限公司 2025校招公告",
            "锡源爆破有限公司 分公司招聘主体",
            "锡源爆破有限公司 行政处罚",
            "锡源爆破有限公司 终止挂牌",
            "锡源爆破有限公司 广西分公司"
          ],
          "usefulFindings": [
            "2025年终止新三板挂牌需单独核验",
            "行政处罚记录暂不写入强结论"
          ],
          "gaps": [
            "无最新校招公告，薪资待遇和作息制度仍为待核对"
          ]
        }
      ]
    }
  },
  {
    "id": 5,
    "name": "广东宏大控股集团股份有限公司",
    "ownership": "国企",
    "city": "广州",
    "region": "广东",
    "salaryRange": "未知",
    "schedule": "待核对",
    "scaleOrIndustry": "矿山民爆 / 防务装备",
    "highlights": [
      "国资控股",
      "民爆一体化",
      "防务板块",
      "矿山服务"
    ],
    "positions": "爆破工程、矿山工程、民爆技术、装备研发等岗位线索",
    "education": "本科及以上岗位线索，具体待核对",
    "website": "https://www.gdhdkg.com/",
    "links": [
      {
        "title": "广东宏大控股集团股份有限公司官网",
        "type": "官网",
        "url": "https://www.gdhdkg.com/"
      },
      {
        "title": "广东宏大关于我们",
        "type": "官网",
        "url": "https://www.gdhdkg.com/show_list.php?id=1"
      },
      {
        "title": "河北工业大学就业中心企业主页",
        "type": "学校就业网",
        "url": "https://career.hebut.edu.cn/company/index/id/16543.html",
        "note": "下属防务企业招聘入口线索。"
      },
      {
        "title": "广东宏大控股集团股份有限公司2023年年度报告全文",
        "type": "新闻资料",
        "url": "https://static.cninfo.com.cn/finalpage/2024-03-30/1219461708.PDF",
        "note": "新闻资料 · 2024-03-30"
      },
      {
        "title": "广东宏大控股集团股份有限公司2022年年度报告全文",
        "type": "新闻资料",
        "url": "https://static.cninfo.com.cn/finalpage/2023-03-25/1216221452.PDF",
        "note": "新闻资料 · 2023-03-25"
      }
    ],
    "description": "业务覆盖民爆、防务装备和矿山服务。",
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "高",
      "updatedAt": "2026-06-08",
      "summary": "官网和学校就业网可支撑业务方向与国资背景，薪资、作息和具体签约主体仍需核对。",
      "verifiedFields": [
        "企业名称和官网入口",
        "广东省国资体系控股线索",
        "防务、民爆、矿服等业务方向",
        "下属企业招聘入口线索"
      ],
      "pendingFields": [
        "最新校招岗位和学历细则",
        "薪资范围",
        "作息和倒班情况",
        "具体签约主体及项目地点"
      ]
    },
    "research": {
      "updatedAt": "2026-06-08",
      "status": "官网和学校就业网资料较清楚，就业细节仍需看最新公告。",
      "relevanceLevel": "高",
      "conclusion": "国资控股上市公司，业务覆盖防务、民爆、矿服，爆破工程、民爆服务和装备研发对口本专业。招聘多落在子公司或项目现场，常驻地点随项目走，岗位按子公司和项目拆分；薪资、作息（待核对）。",
      "keySignals": [
        "官网说明形成防务、民爆、矿服、能化协同业务。",
        "民爆板块包含研发、生产、流通和爆破服务企业。",
        "学校就业网出现下属防务企业招聘入口线索。",
        "上市公司年报可辅助核对业务和子公司分布。"
      ],
      "suitableFor": [
        "关注爆破工程、民爆服务或防务装备方向的学生。",
        "能接受项目现场、分子公司岗位差异的学生。",
        "希望了解国资控股民爆上市公司的学生。"
      ],
      "risks": [
        "招聘主体可能是子公司，不一定是集团总部。",
        "矿山、爆破和工程服务岗位可能涉及现场作业。",
        "薪资、作息、福利未形成可靠公开口径。",
        "防务岗位可能有保密和背景审查要求。"
      ],
      "sources": [
        {
          "title": "广东宏大控股集团股份有限公司官网",
          "type": "官网",
          "date": "2026-06-08",
          "url": "https://www.gdhdkg.com/"
        },
        {
          "title": "关于我们-广东宏大控股集团股份有限公司",
          "type": "官网",
          "date": "2026-06-08",
          "url": "https://www.gdhdkg.com/show_list.php?id=1"
        },
        {
          "title": "河北工业大学就业指导中心：广东宏大防务科技股份有限公司企业主页",
          "type": "学校就业网",
          "date": "2026-06-08",
          "url": "https://career.hebut.edu.cn/company/index/id/16543.html"
        },
        {
          "title": "广东宏大控股集团股份有限公司2023年年度报告全文",
          "type": "新闻资料",
          "date": "2024-03-30",
          "url": "https://static.cninfo.com.cn/finalpage/2024-03-30/1219461708.PDF"
        },
        {
          "title": "广东宏大控股集团股份有限公司2022年年度报告全文",
          "type": "新闻资料",
          "date": "2023-03-25",
          "url": "https://static.cninfo.com.cn/finalpage/2023-03-25/1216221452.PDF"
        }
      ]
    }
  },
  {
    "id": 6,
    "name": "保利联合化工控股集团股份有限公司",
    "ownership": "国企",
    "city": "贵阳",
    "region": "贵州",
    "salaryRange": "未知",
    "schedule": "待核对",
    "scaleOrIndustry": "民爆生产 / 爆破工程",
    "highlights": [
      "央企体系",
      "民爆业务",
      "爆破工程",
      "多地子公司"
    ],
    "positions": "民爆生产、爆破工程、安全管理、化工技术等岗位线索",
    "education": "待核对",
    "website": "https://www.poly-union.com/",
    "links": [
      {
        "title": "保利联合化工控股集团股份有限公司官网",
        "type": "官网",
        "url": "https://www.poly-union.com/"
      },
      {
        "title": "保利联合业务领域",
        "type": "官网",
        "url": "https://www.poly-union.com/channels/161.html"
      },
      {
        "title": "保利久联校园招聘入口",
        "type": "招聘入口",
        "url": "https://www.chinajiulian.com/xyzp/index.htm",
        "note": "集团招聘入口，需核对具体主体。"
      },
      {
        "title": "保利联合化工控股集团股份有限公司2025年年度报告全文",
        "type": "新闻资料",
        "url": "https://www.poly-union.com/upload/files/2026/5/313599adbf4c5e13.pdf",
        "note": "新闻资料 · 2026-05"
      },
      {
        "title": "保利化工控股有限公司2025年校园招聘简章",
        "type": "招聘公告",
        "url": "https://www.polyunion.cn/xyzp/3700.htm",
        "note": "招聘公告 · 2024"
      }
    ],
    "description": "主营民爆产品和爆破工程服务。",
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "高",
      "updatedAt": "2026-06-08",
      "summary": "官网、年报和集团招聘入口可支撑民爆相关性，岗位、薪资、作息（待核对）。",
      "verifiedFields": [
        "企业名称和官网入口",
        "民爆业务和爆破工程方向",
        "保利体系相关线索",
        "集团招聘入口线索"
      ],
      "pendingFields": [
        "最新校招岗位",
        "具体签约单位",
        "薪资范围",
        "作息和项目派驻情况"
      ]
    },
    "research": {
      "updatedAt": "2026-06-08",
      "status": "业务资料较清楚，招聘细节需要回到最新公告。",
      "relevanceLevel": "高",
      "conclusion": "业务以民爆产品和爆破工程为主，属保利体系，对口弹药、爆破工程和安全技术。招聘入口多在集团层面，具体岗位、签约主体、薪资和作息要逐项确认（待核对），投递前先确认是哪一级主体。",
      "keySignals": [
        "官网首页设置民爆业务入口。",
        "年报披露民爆产品和爆破工程施工收入口径。",
        "保利久联招聘页出现校招入口。",
        "下属单位和生产基地较多，地点需单独核对。"
      ],
      "suitableFor": [
        "关注民爆生产、爆破工程和安全管理的学生。",
        "能接受多地子公司或工程现场差异的学生。",
        "希望进入央企相关民爆平台的学生。"
      ],
      "risks": [
        "招聘可能由下属企业发布，需确认签约主体。",
        "工程类岗位可能存在项目现场和出差。",
        "薪资、作息和福利没有稳定公开口径。",
        "年报中的经营风险不能替代岗位风险说明。"
      ],
      "sources": [
        {
          "title": "保利联合化工控股集团股份有限公司官网",
          "type": "官网",
          "date": "2026-06-08",
          "url": "https://www.poly-union.com/"
        },
        {
          "title": "关于我们-保利联合化工控股集团股份有限公司",
          "type": "官网",
          "date": "2026-06-08",
          "url": "https://www.poly-union.com/channels/161.html"
        },
        {
          "title": "保利联合化工控股集团股份有限公司2025年年度报告全文",
          "type": "新闻资料",
          "date": "2026-05",
          "url": "https://www.poly-union.com/upload/files/2026/5/313599adbf4c5e13.pdf"
        },
        {
          "title": "保利久联控股集团有限责任公司校园招聘入口",
          "type": "招聘入口",
          "date": "2026",
          "url": "https://www.chinajiulian.com/xyzp/index.htm"
        },
        {
          "title": "保利化工控股有限公司2025年校园招聘简章",
          "type": "招聘公告",
          "date": "2024",
          "url": "https://www.polyunion.cn/xyzp/3700.htm"
        }
      ]
    }
  },
  {
    "id": 7,
    "name": "四川雅化实业集团股份有限公司",
    "ownership": "民企",
    "city": "雅安",
    "region": "四川",
    "salaryRange": "未知",
    "schedule": "待核对",
    "scaleOrIndustry": "民爆业务 / 锂业务",
    "highlights": [
      "民爆业务",
      "锂业务",
      "危化运输",
      "多地布局"
    ],
    "positions": "工艺技术、安全管理、设备电气、运输管理等历史岗位样本",
    "education": "本科及以上（历史样本，待核对）",
    "website": "https://www.scyahua.com/",
    "links": [
      {
        "title": "四川雅化实业集团股份有限公司官网",
        "type": "官网",
        "url": "https://www.scyahua.com/"
      },
      {
        "title": "雅化集团2022年校园招聘简章",
        "type": "招聘公告",
        "url": "https://cmcc.cdut.edu.cn/__local/F/5F/DC/0DE1FDAF99B4D8308F648CFE2B7_8559F171_2B41F.pdf",
        "note": "历史校招样本，不能代表当前岗位和薪资。"
      },
      {
        "title": "雅化运输关于我们",
        "type": "新闻资料",
        "url": "https://www.yahuayunshu.com/about/",
        "note": "下属危化运输业务线索。"
      },
      {
        "title": "四川雅化实业集团股份有限公司2025年半年度报告全文",
        "type": "新闻资料",
        "url": "https://disc.static.szse.cn/download/disc/disk03/finalpage/2025-08-20/c7e62ec0-c63c-435c-ab84-aa67c87aeec1.PDF",
        "note": "新闻资料 · 2025-08"
      },
      {
        "title": "四川雅化实业集团股份有限公司2024年年度报告全文",
        "type": "新闻资料",
        "url": "https://disc.static.szse.cn/disc/disk03/finalpage/2025-04-28/42dc4baf-863b-4297-aab3-84b317034f91.PDF",
        "note": "新闻资料 · 2025-04"
      }
    ],
    "description": "业务涉及民爆、爆破矿服和锂产品。",
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "高",
      "updatedAt": "2026-06-08",
      "summary": "年报和历史校招样本可支撑民爆、爆破矿服和专业关联，当前薪资、作息和岗位需复核。",
      "verifiedFields": [
        "企业名称和官网入口",
        "民爆与锂业务双主业线索",
        "历史校招出现弹药工程与爆炸技术相关专业",
        "危化运输和爆破矿服相关线索"
      ],
      "pendingFields": [
        "最新校园招聘公告",
        "当前岗位地点",
        "薪资范围",
        "作息与出差安排"
      ]
    },
    "research": {
      "updatedAt": "2026-06-08",
      "status": "业务相关性明确，招聘样本偏历史信息。",
      "relevanceLevel": "高",
      "conclusion": "民爆和锂业务双主业，民爆板块涉及产品、爆破及矿服。历史校招列出过弹药工程与爆炸技术、化工安全等专业，但旧样本不能当现行口径；锂电板块岗位按业务线单独判断，岗位、地点和薪资（待核对）。",
      "keySignals": [
        "年报披露民爆产品、爆破及矿服业务。",
        "历史校招包含工艺技术、安全管理和设备电气岗位。",
        "历史专业要求出现弹药工程与爆炸技术等专业。",
        "下属运输企业涉及危化品和民爆产品运输保障。"
      ],
      "suitableFor": [
        "关注民爆产品、爆破矿服和化工安全的学生。",
        "能接受多省工作地点和生产现场差异的学生。",
        "希望同时了解民爆和新能源材料业务的学生。"
      ],
      "risks": [
        "历史校招不能代表当前招聘计划。",
        "工作地点可能分布在四川及外省子公司。",
        "薪资、作息、福利未找到可靠当前口径。",
        "危化运输和生产岗位可能有安全培训要求。"
      ],
      "sources": [
        {
          "title": "四川雅化实业集团股份有限公司官网",
          "type": "官网",
          "date": "2026-06-08",
          "url": "https://www.scyahua.com/"
        },
        {
          "title": "四川雅化实业集团股份有限公司2025年半年度报告全文",
          "type": "新闻资料",
          "date": "2025-08",
          "url": "https://disc.static.szse.cn/download/disc/disk03/finalpage/2025-08-20/c7e62ec0-c63c-435c-ab84-aa67c87aeec1.PDF"
        },
        {
          "title": "四川雅化实业集团股份有限公司2024年年度报告全文",
          "type": "新闻资料",
          "date": "2025-04",
          "url": "https://disc.static.szse.cn/disc/disk03/finalpage/2025-04-28/42dc4baf-863b-4297-aab3-84b317034f91.PDF"
        },
        {
          "title": "雅化集团2022年校园招聘简章",
          "type": "招聘公告",
          "date": "2022",
          "url": "https://cmcc.cdut.edu.cn/__local/F/5F/DC/0DE1FDAF99B4D8308F648CFE2B7_8559F171_2B41F.pdf"
        },
        {
          "title": "四川雅化实业集团运输有限公司关于我们",
          "type": "新闻资料",
          "date": "2026-06-08",
          "url": "https://www.yahuayunshu.com/about/"
        }
      ]
    }
  },
  {
    "id": 8,
    "name": "安徽江南化工股份有限公司",
    "ownership": "国企",
    "city": "合肥",
    "region": "安徽",
    "salaryRange": "未知",
    "schedule": "待核对",
    "scaleOrIndustry": "民爆主业 / 新能源业务",
    "highlights": [
      "兵器工业体系",
      "民爆主业",
      "智能爆破",
      "新能源业务"
    ],
    "positions": "民爆研发、工艺技术、爆破服务、安全管理等岗位线索",
    "education": "待核对",
    "website": "https://www.ahjnhg.com/",
    "links": [
      {
        "title": "安徽江南化工股份有限公司官网",
        "type": "官网",
        "url": "https://www.ahjnhg.com/"
      },
      {
        "title": "江南化工公司简介",
        "type": "官网",
        "url": "https://www.ahjnhg.com/html/gsjj/index.html"
      },
      {
        "title": "江南化工2025校园招聘线索",
        "type": "招聘公告",
        "url": "https://xyzp.haitou.cc/article/3126280.html",
        "note": "招聘聚合页，作为线索，不支撑核心待遇。"
      },
      {
        "title": "安徽江南化工股份有限公司2025年年度报告摘要",
        "type": "新闻资料",
        "url": "https://paper.cnstock.com/html/2026-04/24/content_2205177.htm",
        "note": "新闻资料 · 2026-04-24"
      },
      {
        "title": "安徽江南化工股份有限公司2024年年度报告全文",
        "type": "新闻资料",
        "url": "https://static.cninfo.com.cn/finalpage/2025-04-17/1223110433.PDF",
        "note": "新闻资料 · 2025-04-17"
      }
    ],
    "description": "兵器工业体系下民爆主业上市公司。",
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "高",
      "updatedAt": "2026-06-08",
      "summary": "官网和年报可支撑兵器工业体系及民爆业务，招聘待遇和岗位细节仍需最新公告核对。",
      "verifiedFields": [
        "企业名称和官网入口",
        "北方特种能源集团控股线索",
        "民爆为主的业务定位",
        "工业炸药、雷管、爆破服务等业务线索"
      ],
      "pendingFields": [
        "最新校招岗位",
        "薪资范围",
        "作息制度",
        "具体工作地点和签约单位"
      ]
    },
    "research": {
      "updatedAt": "2026-06-08",
      "status": "主体和业务证据较稳，招聘信息需保守处理。",
      "relevanceLevel": "高",
      "conclusion": "北方特种能源集团控股，以民爆为主，同时布局新能源。民爆产品、爆破服务和智能制造对口弹药、爆破和安全技术；招聘页只当线索，子公司岗位不能直接套集团口径，岗位、薪资、作息（待核对）。",
      "keySignals": [
        "官网公司简介说明其为兵器工业集团民爆现代产业链核心单位。",
        "年报披露民爆全产业链一体化业务。",
        "公开资料出现民爆技术创新和智能爆破研发线索。",
        "招聘聚合页可作为校招检索线索。"
      ],
      "suitableFor": [
        "关注兵工体系民爆企业的学生。",
        "关注工业炸药、雷管和爆破服务的学生。",
        "希望了解民爆智能制造方向的学生。"
      ],
      "risks": [
        "招聘聚合页不能支撑薪资和作息。",
        "不同子公司和项目地点差异可能较大。",
        "新能源板块对口程度低于民爆主业。",
        "具体岗位需核对当年官方校招公告。"
      ],
      "sources": [
        {
          "title": "安徽江南化工股份有限公司官网",
          "type": "官网",
          "date": "2026-06-08",
          "url": "https://www.ahjnhg.com/"
        },
        {
          "title": "公司简介-江南化工",
          "type": "官网",
          "date": "2026-06-08",
          "url": "https://www.ahjnhg.com/html/gsjj/index.html"
        },
        {
          "title": "安徽江南化工股份有限公司2025年年度报告摘要",
          "type": "新闻资料",
          "date": "2026-04-24",
          "url": "https://paper.cnstock.com/html/2026-04/24/content_2205177.htm"
        },
        {
          "title": "安徽江南化工股份有限公司2024年年度报告全文",
          "type": "新闻资料",
          "date": "2025-04-17",
          "url": "https://static.cninfo.com.cn/finalpage/2025-04-17/1223110433.PDF"
        },
        {
          "title": "安徽江南化工股份有限公司2025校园招聘线索",
          "type": "招聘公告",
          "date": "2025",
          "url": "https://xyzp.haitou.cc/article/3126280.html"
        }
      ]
    }
  },
  {
    "id": 9,
    "name": "江西国泰集团股份有限公司",
    "ownership": "国企",
    "city": "南昌",
    "region": "江西",
    "salaryRange": "未知",
    "schedule": "待核对",
    "scaleOrIndustry": "民爆一体化 / 军工新材料",
    "highlights": [
      "省属国企",
      "民爆一体化",
      "军工新材料",
      "爆破服务"
    ],
    "positions": "民爆生产、爆破施工、安全管理、信息化等岗位线索",
    "education": "待核对",
    "website": "https://www.jxgtjtgw.com/",
    "links": [
      {
        "title": "江西国泰集团股份有限公司官网",
        "type": "官网",
        "url": "https://www.jxgtjtgw.com/"
      },
      {
        "title": "江西国泰集团招聘入口",
        "type": "招聘入口",
        "url": "https://jxgtjtgw.com/jrwm"
      },
      {
        "title": "高校人才网国泰集团招聘专区",
        "type": "招聘入口",
        "url": "https://www.gaoxiaojob.com/company/detail/21790.html",
        "note": "招聘信息线索，需回到官方公告核对。"
      },
      {
        "title": "江西国泰集团股份有限公司2025年半年度报告",
        "type": "新闻资料",
        "url": "https://static.cninfo.com.cn/finalpage/2025-08-21/1224525590.PDF",
        "note": "新闻资料 · 2025-08"
      },
      {
        "title": "江西国泰集团股份有限公司2024年年度报告",
        "type": "新闻资料",
        "url": "https://static.cninfo.com.cn/finalpage/2025-04-18/1223124626.PDF",
        "note": "新闻资料 · 2025-04"
      }
    ],
    "description": "业务涉及民爆一体化和军工新材料。",
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "高",
      "updatedAt": "2026-06-08",
      "summary": "官网、年报和招聘入口可支撑民爆相关性，岗位薪资和作息仍需最新公告确认。",
      "verifiedFields": [
        "企业名称和官网入口",
        "省属国企线索",
        "民爆一体化业务",
        "军工新材料和爆破施工服务线索"
      ],
      "pendingFields": [
        "最新校招岗位明细",
        "学历要求",
        "薪资范围",
        "作息和工作地点"
      ]
    },
    "research": {
      "updatedAt": "2026-06-08",
      "status": "业务相关性较稳，招聘细节仍需最新公告。",
      "relevanceLevel": "高",
      "conclusion": "以民爆一体化为主体，兼有军工新材料、轨交自动化和信息化业务。民爆产品、爆破施工和安全管理对口本专业，招聘入口可关注；非民爆板块按岗位单独判断，薪资、作息和岗位地点（待核对）。",
      "keySignals": [
        "官网和年报均出现民爆一体化业务线索。",
        "半年度报告提到一体两翼产业结构。",
        "高校人才网有招聘专区线索。",
        "民爆产品销售和工程爆破施工服务是重要业务。"
      ],
      "suitableFor": [
        "关注江西省属民爆企业的学生。",
        "关注民爆生产、爆破施工和安全管理的学生。",
        "愿意核对省内多地岗位的学生。"
      ],
      "risks": [
        "岗位可能分布在集团本部和下属单位。",
        "招聘平台信息可能下线或过期。",
        "薪资、作息和福利需以官方公告或面试为准。",
        "薪资、作息和福利（待核对），面试时向招聘方确认。",
      ],
      "sources": [
        {
          "title": "江西国泰集团股份有限公司官网",
          "type": "官网",
          "date": "2026-06-08",
          "url": "https://www.jxgtjtgw.com/"
        },
        {
          "title": "江西国泰集团股份有限公司招聘入口",
          "type": "招聘入口",
          "date": "2026-06-08",
          "url": "https://jxgtjtgw.com/jrwm"
        },
        {
          "title": "江西国泰集团股份有限公司2025年半年度报告",
          "type": "新闻资料",
          "date": "2025-08",
          "url": "https://static.cninfo.com.cn/finalpage/2025-08-21/1224525590.PDF"
        },
        {
          "title": "江西国泰集团股份有限公司2024年年度报告",
          "type": "新闻资料",
          "date": "2025-04",
          "url": "https://static.cninfo.com.cn/finalpage/2025-04-18/1223124626.PDF"
        },
        {
          "title": "高校人才网：江西国泰集团股份有限公司招聘专区",
          "type": "招聘入口",
          "date": "2026",
          "url": "https://www.gaoxiaojob.com/company/detail/21790.html"
        }
      ]
    }
  },
  {
    "id": 10,
    "name": "湖北凯龙化工集团股份有限公司",
    "ownership": "国企",
    "city": "荆门",
    "region": "湖北",
    "salaryRange": "未知",
    "schedule": "待核对",
    "scaleOrIndustry": "民爆产品 / 爆破业务",
    "highlights": [
      "民爆行业",
      "原军工企业",
      "爆破业务",
      "硝酸铵"
    ],
    "positions": "民爆生产、爆破业务、硝酸铵化工、安全管理等岗位线索",
    "education": "待核对",
    "website": "http://www.hbklgroup.cn/",
    "links": [
      {
        "title": "湖北凯龙化工集团股份有限公司官网",
        "type": "官网",
        "url": "http://www.hbklgroup.cn/"
      },
      {
        "title": "凯龙简介",
        "type": "官网",
        "url": "https://m.hbklgroup.cn/GYKL.html?introId=1"
      },
      {
        "title": "凯龙股份控制权变更公告",
        "type": "新闻资料",
        "url": "https://money.finance.sina.com.cn/corp/view/vCB_AllBulletinDetail.php?id=10984017&stockid=002783"
      },
      {
        "title": "湖北凯龙化工集团股份有限公司2025年年度报告",
        "type": "新闻资料",
        "url": "https://money.finance.sina.com.cn/corp/view/vCB_AllBulletinDetail.php?id=12196566&stockid=002783",
        "note": "新闻资料 · 2026-04-25"
      },
      {
        "title": "湖北凯龙化工集团股份有限公司2025年半年度报告全文",
        "type": "新闻资料",
        "url": "https://static.cninfo.com.cn/finalpage/2025-08-27/1224575797.PDF",
        "note": "新闻资料 · 2025-08"
      }
    ],
    "description": "民爆产品和爆破业务相关上市公司。",
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "高",
      "updatedAt": "2026-06-08",
      "summary": "官网、年报和公告可支撑民爆业务及国资控制线索，招聘待遇和岗位细节仍需核对。",
      "verifiedFields": [
        "企业名称和官网入口",
        "原军工企业改制线索",
        "民爆产品和爆破业务",
        "国资控制权变更线索"
      ],
      "pendingFields": [
        "最新招聘公告",
        "薪资范围",
        "作息制度",
        "岗位地点和签约主体"
      ]
    },
    "research": {
      "updatedAt": "2026-06-08",
      "status": "业务和主体资料较明确，招聘信息仍不足。",
      "relevanceLevel": "高",
      "conclusion": "源于原省属军工企业，业务包含民爆产品、爆破业务、硝酸铵和复合肥。民爆与爆破板块对口弹药工程、安全工程；最新校招岗位、薪资和作息（待核对），农化板块与专业关联弱，按岗位单独判断。",
      "keySignals": [
        "官网简介提到原省属军工企业改制背景。",
        "年报披露民爆产品、爆破业务等分部。",
        "公告显示控制权存在国资相关变更线索。",
        "民爆行业安全管理要求较高。"
      ],
      "suitableFor": [
        "关注湖北民爆企业和爆破业务的学生。",
        "关注化工安全、硝酸铵和民爆生产的学生。",
        "能主动核对国资背景和岗位主体的学生。"
      ],
      "risks": [
        "控制权变更信息（待核对）。",
        "招聘细节不足，不能推断薪资和作息。",
        "民爆生产和爆破业务可能有现场安全要求。",
        "不同板块对口程度不同，农化板块基本不相关。"
      ],
      "sources": [
        {
          "title": "湖北凯龙化工集团股份有限公司官网",
          "type": "官网",
          "date": "2026-06-08",
          "url": "http://www.hbklgroup.cn/"
        },
        {
          "title": "凯龙简介-湖北凯龙化工集团股份有限公司",
          "type": "官网",
          "date": "2026-06-08",
          "url": "https://m.hbklgroup.cn/GYKL.html?introId=1"
        },
        {
          "title": "湖北凯龙化工集团股份有限公司2025年年度报告",
          "type": "新闻资料",
          "date": "2026-04-25",
          "url": "https://money.finance.sina.com.cn/corp/view/vCB_AllBulletinDetail.php?id=12196566&stockid=002783"
        },
        {
          "title": "湖北凯龙化工集团股份有限公司2025年半年度报告全文",
          "type": "新闻资料",
          "date": "2025-08",
          "url": "https://static.cninfo.com.cn/finalpage/2025-08-27/1224575797.PDF"
        },
        {
          "title": "凯龙股份关于实际控制人股权转让完成暨公司控制权变更的公告",
          "type": "新闻资料",
          "date": "2024",
          "url": "https://money.finance.sina.com.cn/corp/view/vCB_AllBulletinDetail.php?id=10984017&stockid=002783"
        }
      ]
    }
  },
  {
    "id": 11,
    "name": "山西壶化集团股份有限公司",
    "ownership": "民企",
    "city": "长治",
    "region": "山西",
    "salaryRange": "未知",
    "schedule": "待核对",
    "scaleOrIndustry": "民爆产品 / 爆破服务",
    "highlights": [
      "工业炸药",
      "工业雷管",
      "爆破服务",
      "进出口"
    ],
    "positions": "民爆生产、爆破服务、工艺技术、安全管理等岗位线索",
    "education": "待核对",
    "website": "http://www.shanxihuhua.com/",
    "links": [
      {
        "title": "山西壶化集团股份有限公司官网",
        "type": "官网",
        "url": "http://www.shanxihuhua.com/"
      },
      {
        "title": "壶化股份2025年年度报告",
        "type": "新闻资料",
        "url": "https://money.finance.sina.com.cn/corp/view/vCB_AllBulletinDetail.php?id=12254351&stockid=003002"
      },
      {
        "title": "壶化股份公司资料",
        "type": "其他",
        "url": "https://basic.10jqka.com.cn/003002/company.html",
        "note": "第三方资料，仅作补充线索。"
      },
      {
        "title": "壶化股份2025年度财务决算报告",
        "type": "新闻资料",
        "url": "https://money.finance.sina.com.cn/corp/view/vCB_AllBulletinDetail.php?id=12254631&stockid=003002",
        "note": "新闻资料 · 2026-04"
      },
      {
        "title": "山西壶化集团股份有限公司2025年半年度报告全文",
        "type": "新闻资料",
        "url": "https://disc.static.szse.cn/download/disc/disk03/finalpage/2025-08-28/54b497e5-9d5f-4d2b-9a56-3728dc38b3e5.PDF",
        "note": "新闻资料 · 2025-08"
      }
    ],
    "description": "民爆产品研发、生产、销售和爆破服务企业。",
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "高",
      "updatedAt": "2026-06-08",
      "summary": "年报可支撑民爆产品和爆破服务业务，官网入口及招聘细节仍需继续复核。",
      "verifiedFields": [
        "企业名称",
        "民爆产品研发、生产、销售业务",
        "爆破服务和进出口业务线索",
        "工业炸药、雷管、导爆索等产品线索"
      ],
      "pendingFields": [
        "官网稳定入口",
        "最新校招岗位",
        "薪资范围",
        "作息和项目地点"
      ]
    },
    "research": {
      "updatedAt": "2026-06-08",
      "status": "年报资料能支撑业务相关性，招聘证据不足。",
      "relevanceLevel": "高",
      "conclusion": "业务围绕民爆、出口、爆破和军工，产品涉及工业炸药、工业雷管、导爆索和起爆具。对口弹药工程、爆破工程，但招聘信息不足，薪资和作息（待核对）；出口和军工板块按业务线单独核对。",
      "keySignals": [
        "年报披露民爆、出口、爆破、军工四类业务板块。",
        "产品涉及工业炸药、雷管、导爆索和起爆具。",
        "有爆破服务子公司，业务可继续按子公司拆分核对。",
        "有爆破服务子公司，业务可继续按子公司拆分核对。",
      ],
      "suitableFor": [
        "关注山西及周边民爆企业的学生。",
        "关注工业雷管、炸药和起爆器材的学生。",
        "愿意核对生产现场和爆破服务岗位的学生。"
      ],
      "risks": [
        "官网入口稳定性需后续复查。",
        "招聘公告不足，薪资和作息保持未知。",
        "爆破服务岗位可能涉及现场和出差。",
        "进出口业务对口程度低，按具体岗位判断。"
      ],
      "sources": [
        {
          "title": "山西壶化集团股份有限公司官网",
          "type": "官网",
          "date": "待核对",
          "url": "http://www.shanxihuhua.com/"
        },
        {
          "title": "壶化股份2025年年度报告",
          "type": "新闻资料",
          "date": "2026-04",
          "url": "https://money.finance.sina.com.cn/corp/view/vCB_AllBulletinDetail.php?id=12254351&stockid=003002"
        },
        {
          "title": "壶化股份2025年度财务决算报告",
          "type": "新闻资料",
          "date": "2026-04",
          "url": "https://money.finance.sina.com.cn/corp/view/vCB_AllBulletinDetail.php?id=12254631&stockid=003002"
        },
        {
          "title": "山西壶化集团股份有限公司2025年半年度报告全文",
          "type": "新闻资料",
          "date": "2025-08",
          "url": "https://disc.static.szse.cn/download/disc/disk03/finalpage/2025-08-28/54b497e5-9d5f-4d2b-9a56-3728dc38b3e5.PDF"
        },
        {
          "title": "壶化股份公司资料",
          "type": "其他",
          "date": "2026",
          "url": "https://basic.10jqka.com.cn/003002/company.html"
        }
      ]
    }
  },
  {
    "id": 12,
    "name": "山西同德化工股份有限公司",
    "ownership": "民企",
    "city": "忻州",
    "region": "山西",
    "salaryRange": "未知",
    "schedule": "待核对",
    "scaleOrIndustry": "民用炸药 / 爆破工程",
    "highlights": [
      "民用炸药",
      "爆破工程",
      "销售流通",
      "经营风险"
    ],
    "positions": "民用炸药生产、爆破工程、安全管理、运输等岗位线索",
    "education": "待核对",
    "website": "http://www.tondchem.com/",
    "links": [
      {
        "title": "山西同德化工股份有限公司官网",
        "type": "官网",
        "url": "http://www.tondchem.com/"
      },
      {
        "title": "同德化工2025年年度报告",
        "type": "新闻资料",
        "url": "https://money.finance.sina.com.cn/corp/view/vCB_AllBulletinDetail.php?id=12226355&stockid=002360"
      },
      {
        "title": "同德化工公司资料",
        "type": "其他",
        "url": "https://s.askci.com/stock/summary/002360/",
        "note": "第三方资料，只作补充线索。"
      },
      {
        "title": "山西同德化工股份有限公司2025年年度报告全文",
        "type": "新闻资料",
        "url": "https://disc.static.szse.cn/disc/disk03/finalpage/2026-04-28/081e0302-4256-4086-aabd-7aa5610ffc45.PDF",
        "note": "新闻资料 · 2026-04"
      },
      {
        "title": "山西同德化工股份有限公司2025年半年度报告全文",
        "type": "新闻资料",
        "url": "https://disc.static.szse.cn/disc/disk03/finalpage/2025-08-26/34b08995-575a-48be-8b49-6b95f629806a.PDF",
        "note": "新闻资料 · 2025-08"
      }
    ],
    "description": "业务涉及民用炸药和爆破工程服务。",
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "中",
      "updatedAt": "2026-06-08",
      "summary": "业务与民爆和爆破工程相关，但公开经营风险较多，就业细节和稳定性需重点复查。",
      "verifiedFields": [
        "企业名称和官网入口线索",
        "民用炸药研发、生产、销售业务",
        "爆破工程及相关许可证线索",
        "2025年年度报告中的经营风险线索"
      ],
      "pendingFields": [
        "最新招聘公告",
        "薪资范围",
        "作息制度",
        "重整、经营和岗位稳定性"
      ]
    },
    "research": {
      "updatedAt": "2026-06-08",
      "status": "业务相关性存在，但经营风险需要明确提示。",
      "relevanceLevel": "中",
      "conclusion": "主营民用炸药研发、生产、销售，并提供爆破工程服务，对口本专业。2025 年报和市场报道显示经营压力较大，投递前重点核对招聘真实性、岗位稳定性、薪资和作息（待核对）。",
      "keySignals": [
        "年报披露民爆行业收入占比较高。",
        "公告列出爆破作业、民爆销售、矿山工程等资质线索。",
        "第三方资料显示主营民用炸药及爆破整体解决方案。",
        "2025年报和报道出现亏损、重整等风险线索。"
      ],
      "suitableFor": [
        "需要了解山西民爆企业样本的学生。",
        "关注民用炸药、爆破工程和安全管理岗位的学生。",
        "能主动核对企业经营风险的学生。"
      ],
      "risks": [
        "年报和市场报道显示经营压力较大，不能当成稳定岗位证据。",
        "未找到可靠最新校招公告。",
        "薪资、作息、福利均无可靠公开口径。",
        "投递前应核对重整进展、签约主体和劳动合同主体。"
      ],
      "sources": [
        {
          "title": "山西同德化工股份有限公司官网",
          "type": "官网",
          "date": "待核对",
          "url": "http://www.tondchem.com/"
        },
        {
          "title": "山西同德化工股份有限公司2025年年度报告",
          "type": "新闻资料",
          "date": "2026-04",
          "url": "https://money.finance.sina.com.cn/corp/view/vCB_AllBulletinDetail.php?id=12226355&stockid=002360"
        },
        {
          "title": "山西同德化工股份有限公司2025年年度报告全文",
          "type": "新闻资料",
          "date": "2026-04",
          "url": "https://disc.static.szse.cn/disc/disk03/finalpage/2026-04-28/081e0302-4256-4086-aabd-7aa5610ffc45.PDF"
        },
        {
          "title": "山西同德化工股份有限公司2025年半年度报告全文",
          "type": "新闻资料",
          "date": "2025-08",
          "url": "https://disc.static.szse.cn/disc/disk03/finalpage/2025-08-26/34b08995-575a-48be-8b49-6b95f629806a.PDF"
        },
        {
          "title": "同德化工公司资料",
          "type": "其他",
          "date": "2026",
          "url": "https://s.askci.com/stock/summary/002360/"
        }
      ]
    }
  },
  {
    "id": 13,
    "name": "深圳市金奥博科技股份有限公司",
    "ownership": "民企",
    "city": "深圳",
    "region": "广东",
    "salaryRange": "未知",
    "schedule": "待核对",
    "scaleOrIndustry": "民爆智能装备 / 信息化",
    "highlights": [
      "民爆装备",
      "智能制造",
      "信息化服务",
      "民爆一体化"
    ],
    "positions": "机械设计、自动化、软件系统、工艺装备等岗位线索",
    "education": "待核对",
    "website": "https://www.kingexplorer.com/",
    "links": [
      {
        "title": "深圳市金奥博科技股份有限公司官网",
        "type": "官网",
        "url": "https://www.kingexplorer.com/"
      },
      {
        "title": "金奥博关于我们",
        "type": "官网",
        "url": "https://www.kingexplorer.com/AboutStd_640.html"
      },
      {
        "title": "金奥博智能制造业务",
        "type": "官网",
        "url": "https://www.kingexplorer.com/SolutionSt_znzz.html"
      },
      {
        "title": "深圳市金奥博科技股份有限公司2025年年度报告全文",
        "type": "新闻资料",
        "url": "https://pdf.dfcfw.com/pdf/H2_AN202604091821099793_1.pdf",
        "note": "新闻资料 · 2026-04"
      },
      {
        "title": "金奥博集团主要成员介绍",
        "type": "官网",
        "url": "https://www.kingexplorer.com/AboutStd_796.html",
        "note": "官网 · 2026"
      }
    ],
    "description": "提供民爆智能装备和信息化服务。",
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "高",
      "updatedAt": "2026-06-08",
      "summary": "官网和年报可支撑民爆智能装备相关性，招聘岗位、薪资和作息仍需单独核对。",
      "verifiedFields": [
        "企业名称和官网入口",
        "民爆智能装备业务",
        "工业炸药和电子雷管生产线相关线索",
        "智能制造和信息化服务方向"
      ],
      "pendingFields": [
        "最新招聘公告",
        "岗位学历要求",
        "薪资范围",
        "作息和出差安排"
      ]
    },
    "research": {
      "updatedAt": "2026-06-08",
      "status": "装备和信息化方向证据较稳，招聘细节不足。",
      "relevanceLevel": "高",
      "conclusion": "以民爆智能装备、信息化服务和民爆一体化为主，做工业炸药、数码电子雷管生产线和机器人装备。偏装备自动化与信息化，适合机械、自动化、软件、工艺装备背景学生；岗位多按设备制造和项目实施划分。",
      "keySignals": [
        "官网说明公司提供民爆智能装备与综合信息化服务。",
        "智能制造页面涉及工业炸药成套工艺技术和装备。",
        "年报披露民爆一体化、精细化工、智能制造等板块。",
        "业务与民爆行业无人化、智能化升级方向相关。"
      ],
      "suitableFor": [
        "关注民爆智能制造和自动化装备的学生。",
        "机械、自动化、软件、工业互联网方向背景学生。",
        "想避开纯生产一线、关注装备服务的学生。"
      ],
      "risks": [
        "不是传统弹药生产单位，岗位匹配需看具体部门。",
        "招聘公告不足，不能判断薪资和作息。",
        "项目交付岗位可能有出差或现场调试。",
        "民爆一体化子公司与总部岗位差异较大。"
      ],
      "sources": [
        {
          "title": "深圳市金奥博科技股份有限公司官网",
          "type": "官网",
          "date": "2026-06-08",
          "url": "https://www.kingexplorer.com/"
        },
        {
          "title": "关于我们-深圳市金奥博科技股份有限公司",
          "type": "官网",
          "date": "2026-06-08",
          "url": "https://www.kingexplorer.com/AboutStd_640.html"
        },
        {
          "title": "智能制造-深圳市金奥博科技股份有限公司",
          "type": "官网",
          "date": "2026-06-08",
          "url": "https://www.kingexplorer.com/SolutionSt_znzz.html"
        },
        {
          "title": "深圳市金奥博科技股份有限公司2025年年度报告全文",
          "type": "新闻资料",
          "date": "2026-04",
          "url": "https://pdf.dfcfw.com/pdf/H2_AN202604091821099793_1.pdf"
        },
        {
          "title": "金奥博集团主要成员介绍",
          "type": "官网",
          "date": "2026",
          "url": "https://www.kingexplorer.com/AboutStd_796.html"
        }
      ]
    }
  },
  {
    "id": 14,
    "name": "甘肃银光化学工业集团有限公司",
    "ownership": "国企",
    "city": "白银",
    "region": "甘肃",
    "salaryRange": "未知",
    "schedule": "待核对",
    "scaleOrIndustry": "含能材料 / 特种化工",
    "highlights": [
      "兵器工业体系",
      "含能材料",
      "特种化工",
      "安全工程岗位"
    ],
    "positions": "安全工程、化学工程、化工操作、机械自动化等岗位线索",
    "education": "本科及以上岗位线索，具体待核对",
    "website": "https://www.baiyin.gov.cn/bmzq/gsyghxgyjtyxgs/index.html",
    "links": [
      {
        "title": "白银市政府银光集团专题页",
        "type": "政府资料",
        "url": "https://www.baiyin.gov.cn/bmzq/gsyghxgyjtyxgs/index.html"
      },
      {
        "title": "中国劳动关系学院安全工程系招聘信息",
        "type": "学校就业网",
        "url": "https://www.culr.edu.cn/pub/aqgcx/jyxx/6531.htm"
      },
      {
        "title": "山东大学就业网招聘信息",
        "type": "学校就业网",
        "url": "https://jobcareer.sdu.edu.cn/eweb/jygl/index.so?id=H4zfjMVCbJiCTy7Ag64DNg&modcode=jygl_zpxxck&subsyscode=zpfw&type=ssoViewZpxx"
      },
      {
        "title": "2024年甘肃银光化学工业集团有限公司技能操作人员招聘公告",
        "type": "招聘公告",
        "url": "https://baiyin.huatu.com/2024/0813/1772762.html",
        "note": "招聘公告 · 2024"
      },
      {
        "title": "甘肃人才网：甘肃银光化学工业集团有限公司企业页",
        "type": "招聘入口",
        "url": "https://www.gszhaopin.com/mobile/content/jobs/company/60305.html",
        "note": "招聘入口 · 2026"
      }
    ],
    "description": "兵器工业体系下含能材料和特种化工企业。",
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "高",
      "updatedAt": "2026-06-08",
      "summary": "政府专题、学校就业网和招聘线索可支撑含能材料及安全工程相关性，薪资作息仍需核对。",
      "verifiedFields": [
        "企业名称和白银所在地",
        "兵器工业集团隶属线索",
        "含能材料和特种化工方向",
        "安全工程等招聘岗位线索"
      ],
      "pendingFields": [
        "独立官网入口",
        "最新校招岗位",
        "薪资范围",
        "作息、倒班和涉密要求"
      ]
    },
    "research": {
      "updatedAt": "2026-06-08",
      "status": "业务对口，招聘和待遇公开信息有限。",
      "relevanceLevel": "高",
      "conclusion": "隶属兵器工业体系，涉及含能材料、特种化工和军民品生产，对口弹药工程、安全工程。学校就业网出现安全工程等岗位线索；薪资、作息、倒班和涉密要求（待核对），厂区和岗位地点需单独确认。",
      "keySignals": [
        "学校就业网介绍其为兵器工业集团相关单位。",
        "核心方向包括含能材料和特种化工。",
        "招聘线索出现安全工程、化工和信息技术岗位。",
        "白银市政府专题页可作为官方动态入口。"
      ],
      "suitableFor": [
        "关注含能材料、特种化工和安全工程的学生。",
        "能接受西北生产基地环境的学生。",
        "希望了解兵器工业体系化工单位的学生。"
      ],
      "risks": [
        "未找到稳定独立官网，主要靠政府专题和招聘入口。",
        "生产岗位可能涉及倒班、安全培训或涉密要求。",
        "薪资和作息没有可靠公开口径。",
        "招聘平台主页只能作入口线索。"
      ],
      "sources": [
        {
          "title": "白银市政府：甘肃银光化学工业集团有限公司专题页",
          "type": "政府资料",
          "date": "2026",
          "url": "https://www.baiyin.gov.cn/bmzq/gsyghxgyjtyxgs/index.html"
        },
        {
          "title": "银光化学工业集团招聘安全工程本科生",
          "type": "学校就业网",
          "date": "待核对",
          "url": "https://www.culr.edu.cn/pub/aqgcx/jyxx/6531.htm"
        },
        {
          "title": "山东大学学生就业创业指导中心：甘肃银光化学工业集团有限公司招聘",
          "type": "学校就业网",
          "date": "2023",
          "url": "https://jobcareer.sdu.edu.cn/eweb/jygl/index.so?id=H4zfjMVCbJiCTy7Ag64DNg&modcode=jygl_zpxxck&subsyscode=zpfw&type=ssoViewZpxx"
        },
        {
          "title": "2024年甘肃银光化学工业集团有限公司技能操作人员招聘公告",
          "type": "招聘公告",
          "date": "2024",
          "url": "https://baiyin.huatu.com/2024/0813/1772762.html"
        },
        {
          "title": "甘肃人才网：甘肃银光化学工业集团有限公司企业页",
          "type": "招聘入口",
          "date": "2026",
          "url": "https://www.gszhaopin.com/mobile/content/jobs/company/60305.html"
        }
      ]
    }
  },
  {
    "id": 15,
    "name": "河南省前进化工科技集团股份有限公司",
    "ownership": "待核对",
    "city": "洛阳",
    "region": "河南",
    "salaryRange": "未知",
    "schedule": "待核对",
    "scaleOrIndustry": "民爆器材 / 工程爆破",
    "highlights": [
      "民爆器材",
      "工程爆破",
      "从业培训",
      "校招入口"
    ],
    "positions": "技术、生产安全、质量管理、营销等历史岗位线索",
    "education": "本科及以上（待核对）",
    "website": "https://www.qianjinchem.net.cn/",
    "links": [
      {
        "title": "河南省前进化工科技集团股份有限公司官网",
        "type": "官网",
        "url": "https://www.qianjinchem.net.cn/"
      },
      {
        "title": "河南省前进化工科技集团股份有限公司关于我们",
        "type": "官网",
        "url": "https://www.qianjinchem.net.cn/lists/1.html",
        "note": "用于核对主体、业务方向和集团介绍。"
      },
      {
        "title": "民用爆破器材生产",
        "type": "官网",
        "url": "https://www.qianjinchem.net.cn/lists/4.html",
        "note": "用于核对民爆器材生产线索。"
      },
      {
        "title": "工程爆破",
        "type": "官网",
        "url": "https://www.qianjinchem.net.cn/lists/5.html",
        "note": "用于核对工程爆破服务线索。"
      },
      {
        "title": "社会招聘",
        "type": "招聘入口",
        "url": "https://www.qianjinchem.net.cn/lists/42.html"
      },
      {
        "title": "校园招聘",
        "type": "招聘入口",
        "url": "https://www.qianjinchem.net.cn/lists/43.html"
      },
      {
        "title": "河南开封科技传媒学院招聘公告",
        "type": "学校就业网",
        "url": "https://www.humc.edu.cn/2026/04-03/452255.html",
        "note": "2026年高校招聘公告线索。"
      }
    ],
    "description": "民爆器材、工程爆破与培训相关企业。",
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "高",
      "updatedAt": "2026-06-08",
      "summary": "官网可支撑民爆器材、工程爆破和培训方向，高校招聘公告提供岗位线索；薪资、作息和签约主体仍需核对。",
      "verifiedFields": [
        "企业名称和官网入口",
        "民爆器材、工程爆破、从业培训等业务方向",
        "社会招聘和校园招聘入口",
        "高校招聘公告中的历史岗位线索"
      ],
      "pendingFields": [
        "最新校招岗位和学历细则",
        "薪资范围",
        "工作作息",
        "具体签约主体和工作地点"
      ]
    },
    "research": {
      "updatedAt": "2026-06-08",
      "status": "官网和高校招聘公告线索已整理，就业细节（待核对）。",
      "relevanceLevel": "高",
      "conclusion": "前进科化集团业务涉及民爆器材、工程爆破和爆破从业培训，对口弹药、爆炸技术和安全管理。已有官网和高校招聘公告线索，薪资、作息、岗位地点和签约主体（待核对）；培训业务和学生就业岗要分开看。",
      "keySignals": [
        "官网介绍中出现民爆器材生产、工程爆破和从业人员培训线索。",
        "官网设有社会招聘和校园招聘入口。",
        "高校招聘公告出现技术、生产安全、质量管理等岗位线索。",
        "主体和子公司业务边界需要在正式导入前继续核对。"
      ],
      "suitableFor": [
        "关注民爆器材、工程爆破和安全管理方向的学生。",
        "能接受生产现场、工程项目或子公司岗位差异的学生。",
        "准备逐项核对最新招聘公告的求职学生。"
      ],
      "risks": [
        "招聘主体可能是集团、子公司或具体项目单位，不能默认等同。",
        "工程爆破和生产岗位可能涉及现场作业、安全管控或倒班。",
        "薪资、作息、福利和工作地点未形成可靠公开口径。",
        "荣誉、资质和产能信息不作为就业判断的直接结论。"
      ],
      "sources": [
        {
          "title": "河南省前进化工科技集团股份有限公司官网",
          "type": "官网",
          "date": "2026-06-08访问",
          "url": "https://www.qianjinchem.net.cn/"
        },
        {
          "title": "关于我们-河南省前进化工科技集团股份有限公司",
          "type": "官网",
          "date": "2026-06-08访问",
          "url": "https://www.qianjinchem.net.cn/lists/1.html"
        },
        {
          "title": "民用爆破器材生产-河南省前进化工科技集团股份有限公司",
          "type": "官网",
          "date": "2026-06-08访问",
          "url": "https://www.qianjinchem.net.cn/lists/4.html"
        },
        {
          "title": "工程爆破-河南省前进化工科技集团股份有限公司",
          "type": "官网",
          "date": "2026-06-08访问",
          "url": "https://www.qianjinchem.net.cn/lists/5.html"
        },
        {
          "title": "社会招聘-河南省前进化工科技集团股份有限公司",
          "type": "招聘入口",
          "date": "2026-06-08访问",
          "url": "https://www.qianjinchem.net.cn/lists/42.html"
        },
        {
          "title": "校园招聘-河南省前进化工科技集团股份有限公司",
          "type": "招聘入口",
          "date": "2026-06-08访问",
          "url": "https://www.qianjinchem.net.cn/lists/43.html"
        },
        {
          "title": "河南开封科技传媒学院招聘公告",
          "type": "学校就业网",
          "date": "2026-04-03",
          "url": "https://www.humc.edu.cn/2026/04-03/452255.html"
        }
      ]
    }
  },
  {
    "id": 16,
    "name": "西安航天化学动力有限公司",
    "ownership": "国企",
    "city": "西安",
    "region": "陕西",
    "salaryRange": "未知",
    "schedule": "待核对",
    "scaleOrIndustry": "航天固体动力 / 含能材料",
    "highlights": [
      "固体动力",
      "装药总装",
      "推进剂工艺",
      "高校校招"
    ],
    "positions": "研发、工艺技术、总装测试、安全工程等历史岗位线索",
    "education": "硕士、博士为主（待核对）",
    "website": "",
    "links": [
      {
        "title": "浙江大学就业服务平台宣讲会",
        "type": "学校就业网",
        "url": "https://www.career.zju.edu.cn/jyxt/sczp/xjhgl/ckXjhgwXq.zf?dwxxid=null&xjhbh=ac6ab7ed50b93491de3c2497923a7919",
        "note": "历史宣讲会样本，用于核对单位简介、专业需求和地址线索。"
      },
      {
        "title": "吉林大学就业网：航天动力技术研究院",
        "type": "学校就业网",
        "url": "https://jdjyw.jlu.edu.cn/portal/company/details?id=6954",
        "note": "用于核对中国航天科技集团第四研究院及固体动力方向。"
      },
      {
        "title": "哈工大就业网招聘信息",
        "type": "学校就业网",
        "url": "https://career.hit.edu.cn/zhxy-xszyfzpt/zpxx/zpxxxq?id=NTFkYWE5OWI1ZGQ0NGVmNGE1MmNlNDkyMGIwMzE2Y2I=",
        "note": "历史招聘入口，具体内容需继续人工打开核对。"
      },
      {
        "title": "中国航天人才网",
        "type": "招聘入口",
        "url": "https://www.spacetalent.com.cn/",
        "note": "集团招聘入口，需按年份和单位检索。"
      },
      {
        "title": "固体火箭技术论文：界面脱粘缺陷无损检测方法",
        "type": "新闻资料",
        "url": "https://gthjjs.spacejournal.cn/fileYHCBS/journal/article/gthjjs/html/202103019.html",
        "note": "用于辅助核对单位在固体火箭发动机检测方向的公开论文线索。"
      },
      {
        "title": "固体火箭技术论文：推进剂药浆流动性能表征方法",
        "type": "新闻资料",
        "url": "https://gthjjs.spacejournal.cn/article/doi/10.7673/j.issn.1006-2793.2020.04.013",
        "note": "用于辅助核对单位在固体推进剂工艺方向的公开论文线索。"
      }
    ],
    "description": "固体火箭发动机装药与总装相关单位。",
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "高",
      "updatedAt": "2026-06-08",
      "summary": "高校就业网和公开论文可支撑固体动力、装药总装、推进剂工艺等方向；最新招聘、薪资、作息和涉密要求仍需核对。",
      "verifiedFields": [
        "企业名称和西安地址线索",
        "与中国航天科技集团第四研究院相关的公开招聘线索",
        "固体火箭发动机装药、总装、检测和推进剂工艺方向",
        "高校就业网中的历史专业需求线索"
      ],
      "pendingFields": [
        "最新校招公告和投递入口",
        "岗位学历、专业和工作地点",
        "薪资范围",
        "作息安排、倒班和涉密要求"
      ]
    },
    "research": {
      "updatedAt": "2026-06-08",
      "status": "学校就业网和公开论文线索已整理，最新招聘细节仍待复查。",
      "relevanceLevel": "高",
      "conclusion": "高校就业网和论文线索显示，业务集中在固体火箭发动机装药、总装、检测和推进剂工艺，对口弹药、推进剂和工艺方向。现有招聘多为历史样本，最新校招、薪资、作息和涉密要求（待核对）。",
      "keySignals": [
        "浙江大学就业服务平台历史宣讲会列出公司简介和专业需求。",
        "吉林大学就业网可辅助核对航天四院及固体动力方向。",
        "公开论文出现该单位在固体火箭发动机检测和推进剂工艺方向的署名。",
        "招聘入口主要依赖高校就业网和集团招聘平台，独立官网未确认。"
      ],
      "suitableFor": [
        "关注固体推进剂、含能材料、装药总装和检测方向的学生。",
        "学历背景偏硕士或博士、能接受军工单位流程的学生。",
        "能接受涉密岗位并逐项核对岗位要求的学生。"
      ],
      "risks": [
        "公开招聘样本多为历史公告，不能代表当前岗位。",
        "独立官网入口未确认，需通过集团招聘平台和高校就业网复查。",
        "部分岗位可能有涉密、背景审查、现场作业或倒班要求。",
        "薪资、福利和作息不应根据第三方平台直接下结论。"
      ],
      "sources": [
        {
          "title": "浙江大学就业服务平台：西安航天化学动力有限公司校园招聘宣讲会",
          "type": "学校就业网",
          "date": "2022-09-16",
          "url": "https://www.career.zju.edu.cn/jyxt/sczp/xjhgl/ckXjhgwXq.zf?dwxxid=null&xjhbh=ac6ab7ed50b93491de3c2497923a7919"
        },
        {
          "title": "吉林大学就业网：航天动力技术研究院（中国航天科技集团有限公司第四研究院）",
          "type": "学校就业网",
          "date": "2026-06-08访问",
          "url": "https://jdjyw.jlu.edu.cn/portal/company/details?id=6954"
        },
        {
          "title": "哈工大就业网招聘信息",
          "type": "学校就业网",
          "date": "待核对",
          "url": "https://career.hit.edu.cn/zhxy-xszyfzpt/zpxx/zpxxxq?id=NTFkYWE5OWI1ZGQ0NGVmNGE1MmNlNDkyMGIwMzE2Y2I="
        },
        {
          "title": "中国航天人才网",
          "type": "招聘入口",
          "date": "2026-06-08访问",
          "url": "https://www.spacetalent.com.cn/"
        },
        {
          "title": "一种大型固体火箭发动机界面脱粘缺陷的无损检测方法",
          "type": "新闻资料",
          "date": "2021",
          "url": "https://gthjjs.spacejournal.cn/fileYHCBS/journal/article/gthjjs/html/202103019.html"
        },
        {
          "title": "一种表征固体推进剂药浆浇注过程中流动性能的新方法",
          "type": "新闻资料",
          "date": "2020",
          "url": "https://gthjjs.spacejournal.cn/article/doi/10.7673/j.issn.1006-2793.2020.04.013"
        }
      ]
    }
  },
  {
    "id": 17,
    "name": "云南燃一化工科技有限责任公司",
    "ownership": "国企",
    "city": "曲靖",
    "region": "云南",
    "salaryRange": "未知",
    "schedule": "待核对",
    "scaleOrIndustry": "民爆器材 / 含能材料",
    "highlights": [
      "民爆器材",
      "含能材料",
      "历史招聘",
      "集团线索"
    ],
    "positions": "化工技术、电气自动化等历史岗位线索",
    "education": "本科及以上（待核对）",
    "website": "",
    "links": [
      {
        "title": "曲靖市人社局招聘启事",
        "type": "政府资料",
        "url": "https://rsj.qj.gov.cn/view/gsgg/113679.html",
        "note": "2021年招聘启事，用于核对历史招聘和主体线索。"
      },
      {
        "title": "2020年高校毕业生招聘公告",
        "type": "招聘公告",
        "url": "http://www.hf960.com/n94552c23.aspx",
        "note": "历史招聘公告线索，岗位和薪资不能当作当前口径。"
      },
      {
        "title": "2024年招聘公告转载",
        "type": "其他",
        "url": "https://yn.huatu.com/2024/0514/1812727.html",
        "note": "第三方转载，只作为招聘线索，不单独支撑核心字段。"
      },
      {
        "title": "2024年招聘公众号线索",
        "type": "公众号",
        "url": "https://mp.weixin.qq.com/s/tvfDiuJq5WHtST87ekvFgA",
        "note": "历史招聘线索，需回到官方公告复查。"
      },
      {
        "title": "2025年云南民爆集团缺员岗位社会招聘公告",
        "type": "招聘公告",
        "url": "https://www.hf960.com/n192929c23.aspx",
        "note": "用于核对云南民爆集团及其下属公司线索。"
      }
    ],
    "description": "民爆器材和含能材料相关企业。",
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "高",
      "updatedAt": "2026-06-08",
      "summary": "人社部门和招聘公告可支撑历史招聘、地点和民爆方向线索；官网、最新校招、薪资和作息仍需核对。",
      "verifiedFields": [
        "企业名称和云南曲靖陆良地点线索",
        "民爆器材、含能材料等业务方向线索",
        "2020、2021、2024年历史招聘线索",
        "云南民爆集团下属公司线索"
      ],
      "pendingFields": [
        "公司官网和最新招聘入口",
        "当前校招岗位和学历要求",
        "薪资范围",
        "作息安排和现场岗位比例",
        "签约主体和工作地点"
      ]
    },
    "research": {
      "updatedAt": "2026-06-08",
      "status": "历史招聘和集团线索已整理，官网及最新招聘仍待复查。",
      "relevanceLevel": "高",
      "conclusion": "公开招聘和集团线索显示，云南燃一与民爆器材、含能材料及相关技术岗位关联较强。现有证据多为历史公告和转载线索，适合作为后续就业核对对象，但官网、最新校招、薪资、作息和具体岗位仍需复查。",
      "keySignals": [
        "曲靖市人社局页面提供历史招聘启事线索。",
        "2020年高校毕业生招聘公告出现化工技术等岗位线索。",
        "2024年招聘线索提示可通过公众号或相关入口关注招聘信息。",
        "云南民爆集团社会招聘公告列出下属公司关系线索。"
      ],
      "suitableFor": [
        "关注民爆器材、含能材料和生产技术方向的学生。",
        "能接受曲靖陆良等非省会工作地点的学生。",
        "能接受薪资和签约主体待核对状态的学生。"
      ],
      "risks": [
        "官网入口未稳定确认，不能直接写成已核验官网。",
        "多个招聘公告为历史样本，不能代表当前岗位。",
        "部分岗位可能涉及生产现场、安全管控或倒班。",
        "第三方转载和公众号线索不能单独支撑薪资、待遇或岗位结论。"
      ],
      "sources": [
        {
          "title": "曲靖市人力资源和社会保障局：云南燃一化工科技有限责任公司招聘启事",
          "type": "政府资料",
          "date": "2021年",
          "url": "https://rsj.qj.gov.cn/view/gsgg/113679.html"
        },
        {
          "title": "云南燃一化工科技有限责任公司2020年高校毕业生招聘公告",
          "type": "招聘公告",
          "date": "2020年",
          "url": "http://www.hf960.com/n94552c23.aspx"
        },
        {
          "title": "云南燃一化工科技有限责任公司2024年招聘公告转载",
          "type": "其他",
          "date": "2024-05-14",
          "url": "https://yn.huatu.com/2024/0514/1812727.html"
        },
        {
          "title": "云南燃一2024年招聘公众号线索",
          "type": "公众号",
          "date": "2024年",
          "url": "https://mp.weixin.qq.com/s/tvfDiuJq5WHtST87ekvFgA"
        },
        {
          "title": "云南民爆集团有限责任公司2025年缺员岗位社会招聘公告",
          "type": "招聘公告",
          "date": "2025年",
          "url": "https://www.hf960.com/n192929c23.aspx"
        }
      ]
    }
  },
  {
    "id": 18,
    "name": "安徽雷鸣科化有限责任公司",
    "ownership": "国企",
    "city": "淮北",
    "region": "安徽",
    "salaryRange": "未知",
    "schedule": "待核对",
    "scaleOrIndustry": "民爆器材 / 爆破工程",
    "highlights": [
      "民爆器材",
      "爆破工程",
      "安全评价",
      "集团校招"
    ],
    "positions": "化工、安全、机械、电气等集团校招岗位线索",
    "education": "本科及以上（待核对）",
    "website": "http://ahlmkhap.com/",
    "links": [
      {
        "title": "安徽雷鸣科化有限责任公司安全评价信息网",
        "type": "官网",
        "url": "http://ahlmkhap.com/",
        "note": "用于核对公司入口、安全评价和业务线索。"
      },
      {
        "title": "安徽雷鸣科化有限责任公司信息公开页",
        "type": "官网",
        "url": "http://ahlmkhap.com/info/25899.html",
        "note": "用于核对主体和安全评价相关公开信息。"
      },
      {
        "title": "淮北矿业集团2026届校园招聘",
        "type": "招聘公告",
        "url": "http://www.hbcoal.com/info/1145/43067.htm",
        "note": "集团招聘线索，不能直接等同子公司岗位。"
      },
      {
        "title": "吉林大学就业网：淮北矿业集团2026年校园招聘",
        "type": "学校就业网",
        "url": "https://jdjyw.jlu.edu.cn/mportal/recruit/details?id=a4a2678ad689456aa851b5ad1a62ac71",
        "note": "学校就业网转载的集团校招线索。"
      },
      {
        "title": "淮北矿业控股股份有限公司官网",
        "type": "官网",
        "url": "http://www.hbkykg.com/",
        "note": "用于继续核对集团主体和业务背景。"
      },
      {
        "title": "淮北矿业集团子公司信息公开页",
        "type": "官网",
        "url": "http://www.hbcoal.com/zgsxxgklm/ahlmkhyxzrgs.htm",
        "note": "用于核对子公司关系，需人工复查页面内容。"
      }
    ],
    "description": "民爆器材、爆破工程和安全评价相关企业。",
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "高",
      "updatedAt": "2026-06-08",
      "summary": "公司公开入口和集团招聘可支撑民爆、爆破工程、安全评价及校招线索；子公司具体岗位、薪资和作息仍需核对。",
      "verifiedFields": [
        "企业名称和公开入口",
        "民爆器材、爆破工程、安全评价等业务线索",
        "淮北矿业集团相关公开招聘线索",
        "学校就业网中的集团招聘转载线索"
      ],
      "pendingFields": [
        "是否有子公司单独校招公告",
        "最新岗位、专业和学历细则",
        "薪资范围",
        "工作作息",
        "签约主体和项目地点"
      ]
    },
    "research": {
      "updatedAt": "2026-06-08",
      "status": "公司公开入口和集团招聘线索已整理，岗位细节仍需复查。",
      "relevanceLevel": "高",
      "conclusion": "做民爆器材、爆破工程和安全评价，对口弹药、爆破和安全方向。现有招聘多来自淮北矿业集团层面，不能等同子公司岗位；签约单位可能是集团下属主体，岗位、薪资、作息和签约主体（待核对）。",
      "keySignals": [
        "公司公开入口可核对安全评价和相关业务线索。",
        "集团校招公告提供化工、安全、机械、电气等岗位方向线索。",
        "学校就业网转载可作为招聘传播线索。",
        "子公司关系和岗位落点需要在正式导入前继续核对。"
      ],
      "suitableFor": [
        "关注民爆器材、爆破工程和安全评价方向的学生。",
        "能接受集团统一招聘和子公司分配差异的学生。",
        "愿意核对最新招聘公告、工作地点和安全要求的学生。"
      ],
      "risks": [
        "集团招聘不等于安徽雷鸣科化单独招聘。",
        "爆破工程和生产岗位可能涉及现场作业或安全管控。",
        "薪资、作息、福利和具体岗位未形成可靠公开口径。",
        "企业入口、子公司关系和岗位分配仍需人工复查。"
      ],
      "sources": [
        {
          "title": "安徽雷鸣科化有限责任公司安全评价信息网",
          "type": "官网",
          "date": "2026-06-08访问",
          "url": "http://ahlmkhap.com/"
        },
        {
          "title": "安徽雷鸣科化有限责任公司信息公开页",
          "type": "官网",
          "date": "待核对",
          "url": "http://ahlmkhap.com/info/25899.html"
        },
        {
          "title": "淮北矿业集团2026届校园招聘",
          "type": "招聘公告",
          "date": "2025-09-12",
          "url": "http://www.hbcoal.com/info/1145/43067.htm"
        },
        {
          "title": "吉林大学就业网：淮北矿业集团2026年校园招聘",
          "type": "学校就业网",
          "date": "2025年",
          "url": "https://jdjyw.jlu.edu.cn/mportal/recruit/details?id=a4a2678ad689456aa851b5ad1a62ac71"
        },
        {
          "title": "淮北矿业控股股份有限公司官网",
          "type": "官网",
          "date": "2026-06-08访问",
          "url": "http://www.hbkykg.com/"
        },
        {
          "title": "淮北矿业集团子公司信息公开页",
          "type": "官网",
          "date": "待核对",
          "url": "http://www.hbcoal.com/zgsxxgklm/ahlmkhyxzrgs.htm"
        }
      ]
    }
  },
  {
    "id": 19,
    "name": "陕西北方民爆集团有限公司",
    "ownership": "待核对",
    "city": "华阴",
    "region": "陕西",
    "salaryRange": "未知",
    "schedule": "待核对",
    "scaleOrIndustry": "民爆器材 / 爆破服务",
    "highlights": [
      "民爆器材",
      "爆破服务",
      "陕西区域",
      "校招线索"
    ],
    "positions": "爆破技术、安全管理等历史岗位线索",
    "education": "本科及以上（待核对）",
    "website": "",
    "links": [
      {
        "title": "陕西北方民爆集团有限公司国聘入口",
        "type": "招聘入口",
        "url": "https://www.iguopin.com/company?id=10685311219622058"
      },
      {
        "title": "陕西北方民爆集团有限公司校园招聘岗位",
        "type": "招聘入口",
        "url": "https://www.fenbi.com/page/positions-exams/9/433027",
        "note": "第三方招聘入口，仅作岗位线索。"
      },
      {
        "title": "广州软件学院就业网企业招聘页",
        "type": "学校就业网",
        "url": "http://gdhr.bibibi.net/detail/jobfair_apply?apply_id=1389660&company_id=269649"
      },
      {
        "title": "证券时报股权收购资料",
        "type": "新闻资料",
        "url": "https://www.stcn.com/article/detail/814472.html"
      },
      {
        "title": "江南化工民爆物品生产业务页",
        "type": "官网",
        "url": "https://www.ahjnhg.com/html/mbwpsc/index.html",
        "note": "用于核对江南化工民爆业务范围，不能单独替代陕西北方民爆官网。"
      }
    ],
    "description": "陕西区域民爆器材与爆破服务企业。",
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "高",
      "updatedAt": "2026-06-08",
      "summary": "招聘入口和股权资料显示其与民爆器材、爆破服务相关；官网、最新校招、薪资和作息仍需复核。",
      "verifiedFields": [
        "企业名称和陕西区域线索",
        "民爆器材、爆破服务相关线索",
        "国聘和学校就业网招聘入口",
        "江南化工相关民爆业务和股权线索"
      ],
      "pendingFields": [
        "企业官网或官方公众号入口",
        "最新校招公告和岗位明细",
        "企业性质和实际控股关系",
        "薪资范围、作息和工作地点"
      ]
    },
    "research": {
      "updatedAt": "2026-06-08",
      "status": "已有招聘入口和股权资料线索，但官网与最新招聘公告仍需补证。",
      "relevanceLevel": "高",
      "conclusion": "公开招聘入口和股权资料显示，陕西北方民爆集团与民爆器材、爆破服务和陕西区域生产经营有关，和弹药工程、爆炸技术方向关联较强。但当前缺少企业官网和最新官方校招，薪资、作息、签约主体和工作地点都需复查。",
      "keySignals": [
        "国聘和学校就业网出现企业招聘入口。",
        "岗位线索涉及爆破技术、安全管理等方向。",
        "证券时报资料提供股权收购和企业关系线索。",
        "江南化工官网可支撑民爆业务范围背景。"
      ],
      "suitableFor": [
        "关注民爆器材和爆破服务方向的学生。",
        "愿意核对陕西区域岗位和签约主体的求职学生。",
        "对生产安全、爆破技术岗位有兴趣的学生。"
      ],
      "risks": [
        "当前缺少企业官网或官方公众号入口。",
        "招聘平台信息只能作历史岗位线索，不能代表最新校招。",
        "集团、控股公司和具体签约单位可能不同。",
        "薪资、作息和工作地点没有可靠公开口径。"
      ],
      "sources": [
        {
          "title": "陕西北方民爆集团有限公司国聘入口",
          "type": "招聘入口",
          "date": "待核对",
          "url": "https://www.iguopin.com/company?id=10685311219622058"
        },
        {
          "title": "陕西北方民爆集团有限公司校园招聘岗位",
          "type": "招聘入口",
          "date": "待核对",
          "url": "https://www.fenbi.com/page/positions-exams/9/433027"
        },
        {
          "title": "广州软件学院就业网企业招聘页",
          "type": "学校就业网",
          "date": "待核对",
          "url": "http://gdhr.bibibi.net/detail/jobfair_apply?apply_id=1389660&company_id=269649"
        },
        {
          "title": "证券时报：江南化工收购陕西北方民爆相关资料",
          "type": "新闻资料",
          "date": "2023-03",
          "url": "https://www.stcn.com/article/detail/814472.html"
        },
        {
          "title": "江南化工民爆物品生产业务页",
          "type": "官网",
          "date": "2026-06-08访问",
          "url": "https://www.ahjnhg.com/html/mbwpsc/index.html"
        }
      ]
    }
  },
  {
    "id": 20,
    "name": "辽宁华丰民用化工发展有限公司",
    "ownership": "国企",
    "city": "抚顺",
    "region": "辽宁",
    "salaryRange": "未知",
    "schedule": "待核对",
    "scaleOrIndustry": "民爆器材 / 电子雷管",
    "highlights": [
      "民爆器材",
      "电子雷管",
      "抚顺",
      "校招线索"
    ],
    "positions": "生产技术、工艺、安全管理等历史岗位线索",
    "education": "本科及以上（待核对）",
    "website": "http://www.hfmyhg.com/",
    "links": [
      {
        "title": "辽宁华丰民用化工发展有限公司官网",
        "type": "官网",
        "url": "http://www.hfmyhg.com/"
      },
      {
        "title": "辽宁华丰民用化工发展有限公司招聘信息入口",
        "type": "招聘入口",
        "url": "http://www.hfmyhg.com/News_list_1.html"
      },
      {
        "title": "中国矿业大学就业网招聘公告",
        "type": "学校就业网",
        "url": "https://jy.cumtb.edu.cn/Zhaopin/zuijin.html?id=c60efd7b-78db-4cc0-33ca-44507e93ee81"
      },
      {
        "title": "江南化工收购辽宁华丰民化公告",
        "type": "新闻资料",
        "url": "https://money.finance.sina.com.cn/corp/view/vCB_AllBulletinDetail.php?id=11888977&stockid=002226"
      },
      {
        "title": "抚顺生态环境局电子雷管项目公示",
        "type": "政府资料",
        "url": "https://sthj.fushun.gov.cn/hbsp%EF%BC%88zdjsxmpzhss%EF%BC%89/014002/20240906/a81902d6-3eb0-4394-a0dd-c49d9d35b8cc.html"
      }
    ],
    "description": "抚顺民爆器材和电子雷管相关企业。",
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "高",
      "updatedAt": "2026-06-08",
      "summary": "官网、学校就业网和政府项目公示可支撑民爆器材、电子雷管及招聘线索；薪资、作息和最新岗位仍需复查。",
      "verifiedFields": [
        "企业名称和官网入口",
        "抚顺地区工作地点线索",
        "电子雷管等民爆器材项目线索",
        "学校就业网历史招聘线索"
      ],
      "pendingFields": [
        "最新校招公告和岗位明细",
        "股权结构最新状态",
        "薪资范围",
        "作息和实际工作地点"
      ]
    },
    "research": {
      "updatedAt": "2026-06-08",
      "status": "官网、学校就业网和政府项目公示已整理，招聘细节（待核对）。",
      "relevanceLevel": "高",
      "conclusion": "做民爆器材、电子雷管等产品，对口弹药工程、火工品和安全技术。已有官网、学校就业网和政府公示线索；最新校招、薪资、作息（待核对），岗位多落在生产、工艺和现场，股权状态和签约主体需单独核对。",
      "keySignals": [
        "企业官网和招聘入口可追溯。",
        "学校就业网出现历史招聘公告。",
        "抚顺生态环境局公示涉及电子雷管等建设项目。",
        "江南化工公告提供股权和民爆产能布局线索。"
      ],
      "suitableFor": [
        "关注火工品、电子雷管和民爆器材方向的学生。",
        "愿意到辽宁抚顺生产基地类岗位工作的学生。",
        "需要逐项核对最新招聘公告的求职学生。"
      ],
      "risks": [
        "历史招聘公告不能代表当前岗位开放情况。",
        "股权结构和签约主体（待核对）。",
        "生产岗位可能涉及现场、安全资质或倒班要求。",
        "薪资和作息没有可靠公开口径。"
      ],
      "sources": [
        {
          "title": "辽宁华丰民用化工发展有限公司官网",
          "type": "官网",
          "date": "2026-06-08访问",
          "url": "http://www.hfmyhg.com/"
        },
        {
          "title": "辽宁华丰民用化工发展有限公司招聘信息入口",
          "type": "招聘入口",
          "date": "2026-06-08访问",
          "url": "http://www.hfmyhg.com/News_list_1.html"
        },
        {
          "title": "中国矿业大学就业网招聘公告",
          "type": "学校就业网",
          "date": "2025-05-14",
          "url": "https://jy.cumtb.edu.cn/Zhaopin/zuijin.html?id=c60efd7b-78db-4cc0-33ca-44507e93ee81"
        },
        {
          "title": "江南化工收购辽宁华丰民化公告",
          "type": "新闻资料",
          "date": "2025-12-30",
          "url": "https://money.finance.sina.com.cn/corp/view/vCB_AllBulletinDetail.php?id=11888977&stockid=002226"
        },
        {
          "title": "抚顺生态环境局电子雷管等建设项目拟审批公示",
          "type": "政府资料",
          "date": "2024-09-06",
          "url": "https://sthj.fushun.gov.cn/hbsp%EF%BC%88zdjsxmpzhss%EF%BC%89/014002/20240906/a81902d6-3eb0-4394-a0dd-c49d9d35b8cc.html"
        }
      ]
    }
  },
  {
    "id": 21,
    "name": "四川省南部永生化工有限责任公司",
    "ownership": "待核对",
    "city": "南充",
    "region": "四川",
    "salaryRange": "未知",
    "schedule": "待核对",
    "scaleOrIndustry": "民爆器材 / 爆破服务",
    "highlights": [
      "民爆器材",
      "乳化炸药",
      "爆破服务",
      "南充"
    ],
    "positions": "设备、生产、爆破服务等历史岗位线索",
    "education": "专科及以上（待核对）",
    "website": "",
    "links": [
      {
        "title": "南充市经济和信息化局企业介绍",
        "type": "政府资料",
        "url": "https://www.nanchong.gov.cn/jxj/ztzl/qyml/202110/t20211013_1656189.html"
      },
      {
        "title": "江南化工股权转让公告",
        "type": "新闻资料",
        "url": "https://money.finance.sina.com.cn/corp/view/vCB_AllBulletinDetail.php?stockid=002226&id=10507294"
      },
      {
        "title": "雪峰科技股权收购相关报道",
        "type": "新闻资料",
        "url": "https://finance.eastmoney.com/a/202507043448809115.html"
      },
      {
        "title": "南充职业技术学院就业网",
        "type": "学校就业网",
        "url": "https://nczyjy.university-hr.com/index.php?sys=home&module=jobs&pg=163",
        "note": "历史招聘入口，仅作岗位线索。"
      },
      {
        "title": "南充人大企业相关报道",
        "type": "新闻资料",
        "url": "https://www.ncrd.gov.cn/index.php?a=show&c=index&catid=58&id=3760&m=content"
      }
    ],
    "description": "南充民爆器材和爆破服务相关企业。",
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "高",
      "updatedAt": "2026-06-08",
      "summary": "政府资料和就业网线索可支撑民爆器材、乳化炸药和历史招聘方向；股权、官网和最新校招仍需核对。",
      "verifiedFields": [
        "企业名称和南充地区线索",
        "民用爆破器材定点生产企业线索",
        "乳化炸药和爆破服务方向",
        "学校就业网历史岗位线索"
      ],
      "pendingFields": [
        "官网或官方公众号入口",
        "最新股权结构",
        "最新招聘公告",
        "薪资范围、作息和工作地点"
      ]
    },
    "research": {
      "updatedAt": "2026-06-08",
      "status": "政府资料和历史招聘线索已整理，股权及最新招聘状态仍需复查。",
      "relevanceLevel": "高",
      "conclusion": "公开政府资料和就业网线索显示，四川省南部永生化工有限责任公司与民爆器材、乳化炸药和爆破服务有关，和弹药工程、爆炸技术方向关联较强。但官网、最新股权结构和当前招聘信息仍需补证，薪资作息不能确定。",
      "keySignals": [
        "南充市经信局企业资料提供主体和业务线索。",
        "公开资料中出现民爆器材和乳化炸药相关描述。",
        "学校就业网提供历史招聘岗位线索。",
        "股权公告显示企业关系可能发生变化。"
      ],
      "suitableFor": [
        "关注民爆器材、乳化炸药和爆破服务方向的学生。",
        "能接受县域生产基地或现场类岗位的学生。",
        "愿意核对最新股权和招聘公告的求职学生。"
      ],
      "risks": [
        "当前官网或官方招聘入口不足。",
        "股权结构和签约主体可能已经变化。",
        "历史招聘岗位不能代表当前校招安排。",
        "薪资、作息和工作地点没有可靠公开口径。"
      ],
      "sources": [
        {
          "title": "南充市经济和信息化局企业介绍",
          "type": "政府资料",
          "date": "2021-10-13",
          "url": "https://www.nanchong.gov.cn/jxj/ztzl/qyml/202110/t20211013_1656189.html"
        },
        {
          "title": "江南化工股权转让公告",
          "type": "新闻资料",
          "date": "2024-09-30",
          "url": "https://money.finance.sina.com.cn/corp/view/vCB_AllBulletinDetail.php?stockid=002226&id=10507294"
        },
        {
          "title": "雪峰科技股权收购相关报道",
          "type": "新闻资料",
          "date": "2025",
          "url": "https://finance.eastmoney.com/a/202507043448809115.html"
        },
        {
          "title": "南充职业技术学院就业网历史招聘入口",
          "type": "学校就业网",
          "date": "2022",
          "url": "https://nczyjy.university-hr.com/index.php?sys=home&module=jobs&pg=163"
        },
        {
          "title": "南充人大企业相关报道",
          "type": "新闻资料",
          "date": "待核对",
          "url": "https://www.ncrd.gov.cn/index.php?a=show&c=index&catid=58&id=3760&m=content"
        }
      ]
    }
  },
  {
    "id": 22,
    "name": "河南省现代爆破技术有限公司",
    "ownership": "待核对",
    "city": "郑州",
    "region": "河南",
    "salaryRange": "未知",
    "schedule": "待核对",
    "scaleOrIndustry": "爆破工程 / 民爆服务",
    "highlights": [
      "爆破工程",
      "工程施工",
      "前进科化线索",
      "招聘线索"
    ],
    "positions": "工程技术、项目管理等历史岗位线索",
    "education": "待核对",
    "website": "http://xdbp.cn/",
    "links": [
      {
        "title": "河南省现代爆破技术有限公司官网",
        "type": "官网",
        "url": "http://xdbp.cn/"
      },
      {
        "title": "河南省现代爆破技术有限公司人才招聘页",
        "type": "招聘公告",
        "url": "http://xdbp.cn/news/baopo/shtml/T-26.htm"
      },
      {
        "title": "前进科化集团官网",
        "type": "官网",
        "url": "https://www.qianjinchem.net.cn/",
        "note": "用于核对集团民爆和工程爆破业务背景，不能替代目标企业最新招聘公告。"
      },
      {
        "title": "前进科化集团关于我们页面",
        "type": "官网",
        "url": "https://www.qianjinchem.net.cn/lists/1.html",
        "note": "官网 · 2026-06-08访问"
      },
      {
        "title": "前进科化集团资质证书页面",
        "type": "官网",
        "url": "https://qianjinchem.net.cn/lists/21.html",
        "note": "官网 · 2026-06-08访问"
      }
    ],
    "description": "河南郑州爆破工程与技术服务企业。",
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "高",
      "updatedAt": "2026-06-08",
      "summary": "目标企业官网和前进科化集团官网可支撑爆破工程方向；最新岗位、薪资、作息和股权关系仍需复核。",
      "verifiedFields": [
        "企业名称和官网入口",
        "爆破工程、爆破技术咨询等业务线索",
        "人才招聘页面入口",
        "前进科化集团相关业务背景线索"
      ],
      "pendingFields": [
        "企业性质和最新股权关系",
        "最新校招或社招岗位",
        "薪资范围",
        "作息、项目地点和外业频率"
      ]
    },
    "research": {
      "updatedAt": "2026-06-08",
      "status": "官网和集团资料已整理，招聘细节（待核对）。",
      "relevanceLevel": "高",
      "conclusion": "官网和前进科化集团官网显示，河南现代爆破与工程爆破、爆破技术咨询等业务有关，和爆炸技术实践方向关联较强。但资料主要来自企业及集团官网，外部招聘证据较少；最新岗位、薪资、作息、项目地点和签约主体需人工复核。",
      "keySignals": [
        "目标企业官网可追溯。",
        "官网设置人才招聘页面。",
        "前进科化集团官网列出工程爆破和民爆产业背景。",
        "集团页面出现现代爆破有限公司子公司线索。"
      ],
      "suitableFor": [
        "关注爆破工程现场实践的学生。",
        "愿意核对项目地点和外业频率的求职学生。",
        "对民爆服务和安全技术岗位有兴趣的学生。"
      ],
      "risks": [
        "招聘页面可能不是最新校招公告。",
        "企业性质、股权关系和签约主体需人工复查。",
        "爆破工程岗位可能涉及外业、项目驻场和资质要求。",
        "薪资和作息没有可靠公开口径。"
      ],
      "sources": [
        {
          "title": "河南省现代爆破技术有限公司官网",
          "type": "官网",
          "date": "2026-06-08访问",
          "url": "http://xdbp.cn/"
        },
        {
          "title": "河南省现代爆破技术有限公司人才招聘页",
          "type": "招聘公告",
          "date": "待核对",
          "url": "http://xdbp.cn/news/baopo/shtml/T-26.htm"
        },
        {
          "title": "河南省前进化工科技集团股份有限公司官网",
          "type": "官网",
          "date": "2026-06-08访问",
          "url": "https://www.qianjinchem.net.cn/"
        },
        {
          "title": "前进科化集团关于我们页面",
          "type": "官网",
          "date": "2026-06-08访问",
          "url": "https://www.qianjinchem.net.cn/lists/1.html"
        },
        {
          "title": "前进科化集团资质证书页面",
          "type": "官网",
          "date": "2026-06-08访问",
          "url": "https://qianjinchem.net.cn/lists/21.html"
        }
      ]
    }
  },
  {
    "id": 23,
    "name": "山东特种工业集团有限公司",
    "ownership": "国企",
    "city": "淄博",
    "region": "山东",
    "salaryRange": "未知",
    "schedule": "待核对",
    "scaleOrIndustry": "军工弹药 / 民品制造",
    "highlights": [
      "军工制造",
      "弹药方向",
      "民爆器材线索",
      "校招线索"
    ],
    "positions": "研发、工艺、安全管理等历史岗位线索",
    "education": "本科及以上（待核对）",
    "website": "",
    "links": [
      {
        "title": "山东特种工业集团有限公司国聘入口",
        "type": "招聘入口",
        "url": "https://www.iguopin.com/company?id=10685311443832344"
      },
      {
        "title": "济南大学机械工程学院招聘信息",
        "type": "学校就业网",
        "url": "https://me.ujn.edu.cn/info/1447/9160.htm"
      },
      {
        "title": "中北大学机电工程学院招聘信息",
        "type": "学校就业网",
        "url": "https://jdgc.nuc.edu.cn/info/1038/12108.htm"
      },
      {
        "title": "中国兵器工业集团官网",
        "type": "官网",
        "url": "https://www.norincogroup.com.cn/",
        "note": "用于核对上级集团背景，不能替代目标企业独立官网。"
      },
      {
        "title": "山东省工信厅安全生产标准化公告",
        "type": "政府资料",
        "url": "http://gxt.shandong.gov.cn/art/2023/4/17/art_15202_10327324.html"
      }
    ],
    "description": "淄博军工弹药和民品制造企业。",
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "高",
      "updatedAt": "2026-06-08",
      "summary": "学校就业网、国聘和政府资料可支撑军工弹药相关线索；独立官网、最新岗位和薪资作息仍需复核。",
      "verifiedFields": [
        "企业名称和淄博地区线索",
        "中国兵器工业集团相关背景线索",
        "学校就业网历史招聘信息",
        "政府安全生产标准化资料线索"
      ],
      "pendingFields": [
        "企业独立官网或官方公众号入口",
        "最新校招公告和岗位明细",
        "薪资范围",
        "作息、厂区分配和涉密要求"
      ]
    },
    "research": {
      "updatedAt": "2026-06-08",
      "status": "学校就业网、招聘入口和政府资料已整理，最新招聘细则仍需复查。",
      "relevanceLevel": "高",
      "conclusion": "学校就业网、国聘和政府资料显示其做弹药、民爆器材和军工制造，对口度较高。缺少独立官网和最新校招细则，岗位、薪资、作息（待核对），投递前确认厂区分配和涉密要求，接受不了就别投。",
      "keySignals": [
        "多所高校就业网有历史招聘信息。",
        "国聘存在企业招聘入口。",
        "学校就业网材料提到弹药和民爆器材相关业务线索。",
        "山东省工信厅资料提供安全生产标准化线索。"
      ],
      "suitableFor": [
        "关注军工弹药制造方向的学生。",
        "愿意到山东淄博及相关厂区工作的学生。",
        "能接受涉密和生产安全要求复核的求职学生。"
      ],
      "risks": [
        "当前缺少目标企业独立官网入口。",
        "历史招聘信息不能代表当前仍在招聘。",
        "岗位可能分布在不同生产厂区。",
        "薪资、作息和涉密要求没有可靠公开口径。"
      ],
      "sources": [
        {
          "title": "山东特种工业集团有限公司国聘入口",
          "type": "招聘入口",
          "date": "待核对",
          "url": "https://www.iguopin.com/company?id=10685311443832344"
        },
        {
          "title": "济南大学机械工程学院山东特种工业集团招聘信息",
          "type": "学校就业网",
          "date": "待核对",
          "url": "https://me.ujn.edu.cn/info/1447/9160.htm"
        },
        {
          "title": "中北大学机电工程学院山东特种工业集团招聘信息",
          "type": "学校就业网",
          "date": "待核对",
          "url": "https://jdgc.nuc.edu.cn/info/1038/12108.htm"
        },
        {
          "title": "中国兵器工业集团官网",
          "type": "官网",
          "date": "2026-06-08访问",
          "url": "https://www.norincogroup.com.cn/"
        },
        {
          "title": "山东省工信厅军工安全生产标准化公告",
          "type": "政府资料",
          "date": "2023-04-17",
          "url": "http://gxt.shandong.gov.cn/art/2023/4/17/art_15202_10327324.html"
        }
      ]
    }
  },
  {
    "id": 24,
    "name": "重庆红宇精密工业集团有限公司",
    "ownership": "国企",
    "city": "重庆",
    "region": "重庆",
    "salaryRange": "未知",
    "schedule": "待核对",
    "scaleOrIndustry": "特种装备 / 精密制造",
    "highlights": [
      "特种装备",
      "兵器弹药类岗位线索",
      "重庆基地",
      "校招线索"
    ],
    "positions": "科研开发、工艺技术、兵器弹药类历史岗位线索",
    "education": "本科及以上（待核对）",
    "website": "https://hongyu.csgc.com.cn/",
    "links": [
      {
        "title": "重庆红宇精密工业集团有限公司官网",
        "type": "官网",
        "url": "https://hongyu.csgc.com.cn/"
      },
      {
        "title": "国务院国资委招聘公告",
        "type": "招聘公告",
        "url": "http://www.sasac.gov.cn/n2588035/n2588325/n2588350/c31844324/content.html"
      },
      {
        "title": "吉林大学就业网公司详情",
        "type": "学校就业网",
        "url": "https://jdjyw.jlu.edu.cn/portal/company/details?id=5892"
      },
      {
        "title": "前程无忧校园招聘入口",
        "type": "招聘入口",
        "url": "https://campus.51job.com/chongqinghongyujinggong/"
      },
      {
        "title": "中北大学专场招聘会",
        "type": "学校就业网",
        "url": "https://jdgc.nuc.edu.cn/info/1012/16354.htm"
      }
    ],
    "description": "重庆特种装备与精密制造企业。",
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "高",
      "updatedAt": "2026-06-08",
      "summary": "官网、国资委招聘公告和学校就业网可支撑特种装备及兵器弹药类岗位线索；薪资作息仍需复核。",
      "verifiedFields": [
        "企业名称和官网入口",
        "中国兵器装备集团相关背景线索",
        "学校就业网公司详情和招聘活动线索",
        "兵器弹药类岗位或专业需求线索"
      ],
      "pendingFields": [
        "最新校招公告和岗位明细",
        "薪资范围",
        "作息安排",
        "多基地分配、实习期安排和涉密要求"
      ]
    },
    "research": {
      "updatedAt": "2026-06-08",
      "status": "官网、官方招聘公告和学校就业网已整理，岗位细节（待核对）。",
      "relevanceLevel": "高",
      "conclusion": "官网、国资委招聘公告和学校就业网显示，重庆红宇做特种装备、精密制造，有兵器弹药类招聘需求，对口较强。薪资、作息（待核对），多基地岗位投递前确认地点和签约主体，别只按总部岗位判断。",
      "keySignals": [
        "企业官网可追溯。",
        "国务院国资委网站发布过校园招聘公告。",
        "吉林大学就业网有公司详情和招聘线索。",
        "中北大学专场招聘会与相关专业方向存在交集。"
      ],
      "suitableFor": [
        "关注特种装备和兵器弹药类岗位的学生。",
        "希望在重庆区域就业的求职学生。",
        "愿意核对涉密、基地分配和岗位细节的学生。"
      ],
      "risks": [
        "历史校园招聘入口不能代表当前仍在招聘。",
        "工作地点可能涉及重庆多个基地。",
        "部分岗位可能有涉密或生产现场要求。",
        "薪资和作息没有可靠公开口径。"
      ],
      "sources": [
        {
          "title": "重庆红宇精密工业集团有限公司官网",
          "type": "官网",
          "date": "2026-06-08访问",
          "url": "https://hongyu.csgc.com.cn/"
        },
        {
          "title": "国务院国资委重庆红宇精密工业集团校园招聘公告",
          "type": "招聘公告",
          "date": "2024-10-09",
          "url": "http://www.sasac.gov.cn/n2588035/n2588325/n2588350/c31844324/content.html"
        },
        {
          "title": "吉林大学就业网重庆红宇精密工业集团公司详情",
          "type": "学校就业网",
          "date": "待核对",
          "url": "https://jdjyw.jlu.edu.cn/portal/company/details?id=5892"
        },
        {
          "title": "前程无忧重庆红宇精密工业集团校园招聘入口",
          "type": "招聘入口",
          "date": "待核对",
          "url": "https://campus.51job.com/chongqinghongyujinggong/"
        },
        {
          "title": "中北大学重庆红宇精密工业集团专场招聘会",
          "type": "学校就业网",
          "date": "2025年",
          "url": "https://jdgc.nuc.edu.cn/info/1012/16354.htm"
        }
      ]
    }
  },
  {
    "id": 25,
    "name": "河南中南工业有限责任公司",
    "ownership": "国企",
    "city": "南阳",
    "region": "河南",
    "salaryRange": "未知",
    "schedule": "待核对",
    "scaleOrIndustry": "军工制造 / 超硬材料",
    "highlights": [
      "军工制造",
      "特种弹药线索",
      "超硬材料",
      "招聘线索"
    ],
    "positions": "机械、电气、自动化、安全管理等历史岗位线索",
    "education": "本科及以上（待核对）",
    "website": "",
    "links": [
      {
        "title": "中国兵器校园招聘平台岗位入口",
        "type": "招聘入口",
        "url": "https://zhaopin.nhrdc.cn/campus/job.jsp?id=20518&from=1"
      },
      {
        "title": "河南中南工业有限责任公司国聘入口",
        "type": "招聘入口",
        "url": "https://www.iguopin.com/company?id=10685311473565976"
      },
      {
        "title": "商丘学院就业创业招聘信息",
        "type": "学校就业网",
        "url": "https://www.sqxy.edu.cn/squ_jjglxy/contents/2747/2888.html"
      },
      {
        "title": "方城县人民政府招聘活动信息",
        "type": "政府资料",
        "url": "https://www.fangcheng.gov.cn/2025/06-05/1043396.html"
      },
      {
        "title": "方城县人社局招聘信息",
        "type": "政府资料",
        "url": "https://www.fangcheng.gov.cn/2025/05-07/1037907.html"
      }
    ],
    "description": "南阳军工制造和超硬材料企业。",
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "中",
      "updatedAt": "2026-06-08",
      "summary": "招聘平台、学校就业网和政府招聘活动资料可支撑军工制造及招聘线索；独立官网和最新校招仍需复核。",
      "verifiedFields": [
        "企业名称和南阳方城地区线索",
        "中国兵器相关招聘入口",
        "学校就业网历史招聘材料",
        "政府招聘活动参与线索"
      ],
      "pendingFields": [
        "企业独立官网或官方公众号",
        "最新校招公告和岗位明细",
        "特种弹药相关业务的最新官方表述",
        "薪资、作息、厂区分配和涉密要求"
      ]
    },
    "research": {
      "updatedAt": "2026-06-08",
      "status": "招聘入口、学校就业网和政府招聘活动资料已整理，核心业务仍需补官方资料。",
      "relevanceLevel": "中",
      "conclusion": "公开招聘入口、学校就业网和政府招聘资料显示其做军工制造、超硬材料和部分特种弹药。相关度按中等参考，但缺独立官网和最新校招细则；岗位、薪资、作息、厂区和涉密要求（待核对）。",
      "keySignals": [
        "中国兵器校园招聘平台出现岗位入口。",
        "国聘存在企业招聘入口。",
        "学校就业网材料提供历史单位概况和招聘线索。",
        "方城县政府页面出现企业参加招聘活动线索。"
      ],
      "suitableFor": [
        "关注军工制造和特种装备方向的学生。",
        "愿意到河南南阳方城就业的求职学生。",
        "需要逐项核对涉密和生产现场要求的学生。"
      ],
      "risks": [
        "当前缺少企业独立官网入口。",
        "历史招聘材料不能代表当前仍在招聘。",
        "特种弹药相关描述需以最新官方资料复核。",
        "薪资和作息没有可靠公开口径。"
      ],
      "sources": [
        {
          "title": "中国兵器校园招聘平台岗位入口",
          "type": "招聘入口",
          "date": "待核对",
          "url": "https://zhaopin.nhrdc.cn/campus/job.jsp?id=20518&from=1"
        },
        {
          "title": "河南中南工业有限责任公司国聘入口",
          "type": "招聘入口",
          "date": "待核对",
          "url": "https://www.iguopin.com/company?id=10685311473565976"
        },
        {
          "title": "商丘学院就业创业招聘信息",
          "type": "学校就业网",
          "date": "2022-06-03",
          "url": "https://www.sqxy.edu.cn/squ_jjglxy/contents/2747/2888.html"
        },
        {
          "title": "方城县人民政府招聘活动信息",
          "type": "政府资料",
          "date": "2025-06-05",
          "url": "https://www.fangcheng.gov.cn/2025/06-05/1043396.html"
        },
        {
          "title": "方城县人社局招聘信息",
          "type": "政府资料",
          "date": "2025-05-07",
          "url": "https://www.fangcheng.gov.cn/2025/05-07/1037907.html"
        }
      ]
    }
  },
  {
    "id": 26,
    "name": "陕西庆华汽车安全系统有限公司",
    "ownership": "待核对",
    "city": "西安",
    "region": "陕西",
    "salaryRange": "未知",
    "schedule": "待核对",
    "scaleOrIndustry": "汽车安全火工品 / 气体发生器",
    "highlights": [
      "点火具线索",
      "产气药剂线索",
      "汽车安全系统",
      "军工背景待核对"
    ],
    "positions": "研发、工艺、质量、材料等历史岗位线索",
    "education": "本科及以上或研究生（待核对）",
    "website": "https://www.qhvss.com",
    "links": [
      {
        "title": "陕西庆华汽车安全系统有限公司官网",
        "type": "官网",
        "url": "https://www.qhvss.com"
      },
      {
        "title": "学校就业网校园招聘公告",
        "type": "学校就业网",
        "url": "https://gzdxhrrjxy.bibibi.net/detail/jobfair_apply?apply_id=1491079&company_id=493259"
      },
      {
        "title": "陕西省工信厅调研信息",
        "type": "政府资料",
        "url": "https://gxt.shaanxi.gov.cn/cyfz/aqsc/202411/t20241105_3306905.html"
      },
      {
        "title": "巨潮资讯相关公告",
        "type": "新闻资料",
        "url": "https://static.cninfo.com.cn/finalpage/2016-12-09/1202866087.PDF"
      },
      {
        "title": "巨潮资讯项目相关公告",
        "type": "新闻资料",
        "url": "https://static.cninfo.com.cn/finalpage/2021-01-30/1209214843.PDF"
      }
    ],
    "description": "西安汽车安全火工品应用企业。",
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "中",
      "updatedAt": "2026-06-08",
      "summary": "官网、学校就业网、政府调研和上市公司公告可支撑汽车安全火工品线索；企业性质和最新招聘仍需复核。",
      "verifiedFields": [
        "企业名称和西安地区线索",
        "点火具、产气药剂、微型气体发生器等业务线索",
        "学校就业网历史招聘线索",
        "陕西省工信厅调研线索"
      ],
      "pendingFields": [
        "官网可访问性和最新内容",
        "企业性质和控股关系最新状态",
        "最新岗位、学历和专业要求",
        "薪资、作息、生产现场要求和涉密要求"
      ]
    },
    "research": {
      "updatedAt": "2026-06-08",
      "status": "官网、学校就业网、政府资料和公告已整理，按中等对口处理。",
      "relevanceLevel": "中",
      "conclusion": "做点火具、产气药剂、微型气体发生器等汽车安全火工品，和含能材料、火工品方向有交集。业务主线偏汽车安全系统，不是弹药核心就业；岗位、薪资、作息和控股关系（待核对）。",
      "keySignals": [
        "官网入口可作为主体核对线索。",
        "学校就业网出现校园招聘公告线索。",
        "陕西省工信厅页面提到对该企业开展调研。",
        "上市公司公告提供点火具、产气药剂等业务线索。"
      ],
      "suitableFor": [
        "关注火工品在汽车安全系统中应用的学生。",
        "对含能材料、点火具和产气药剂有兴趣的学生。",
        "愿意在西安核对具体岗位细则的求职学生。"
      ],
      "risks": [
        "相关度偏应用场景，不是弹药工程核心单位。",
        "历史招聘公告不能代表当前仍在招聘。",
        "企业性质和控股关系（待核对）。",
        "薪资、作息和生产现场要求没有可靠公开口径。"
      ],
      "sources": [
        {
          "title": "陕西庆华汽车安全系统有限公司官网",
          "type": "官网",
          "date": "待核对",
          "url": "https://www.qhvss.com"
        },
        {
          "title": "学校就业网校园招聘公告",
          "type": "学校就业网",
          "date": "2025年",
          "url": "https://gzdxhrrjxy.bibibi.net/detail/jobfair_apply?apply_id=1491079&company_id=493259"
        },
        {
          "title": "陕西省工信厅安全生产处调研信息",
          "type": "政府资料",
          "date": "2024-11-05",
          "url": "https://gxt.shaanxi.gov.cn/cyfz/aqsc/202411/t20241105_3306905.html"
        },
        {
          "title": "巨潮资讯陕西庆华汽车安全系统相关公告",
          "type": "新闻资料",
          "date": "2016-12-09",
          "url": "https://static.cninfo.com.cn/finalpage/2016-12-09/1202866087.PDF"
        },
        {
          "title": "巨潮资讯陕西庆华项目相关公告",
          "type": "新闻资料",
          "date": "2021-01-30",
          "url": "https://static.cninfo.com.cn/finalpage/2021-01-30/1209214843.PDF"
        }
      ]
    }
  },
  {
    "id": 27,
    "name": "河南省松光民爆器材股份有限公司",
    "ownership": "待核对",
    "city": "荥阳",
    "region": "河南",
    "salaryRange": "未知",
    "schedule": "待核对",
    "scaleOrIndustry": "民爆器材 / 工业炸药",
    "highlights": [
      "工业炸药",
      "民爆器材",
      "易普力收购线索",
      "河南区域"
    ],
    "positions": "待核对，未见可靠公开招聘公告",
    "education": "待核对",
    "website": "",
    "links": [
      {
        "title": "巨潮资讯收购公告",
        "type": "新闻资料",
        "url": "https://static.cninfo.com.cn/finalpage/2025-03-27/1222912401.PDF"
      },
      {
        "title": "新浪财经收购公告",
        "type": "新闻资料",
        "url": "https://money.finance.sina.com.cn/corp/view/vCB_AllBulletinDetail.php?id=10811129&stockid=002096"
      },
      {
        "title": "上海证券报收购公告",
        "type": "新闻资料",
        "url": "https://paper.cnstock.com/html/2025-03/27/content_2040805.htm"
      },
      {
        "title": "巨潮资讯半年度报告全文",
        "type": "新闻资料",
        "url": "https://static.cninfo.com.cn/finalpage/2025-08-29/1224605072.PDF"
      },
      {
        "title": "新浪财经年度报告",
        "type": "新闻资料",
        "url": "https://money.finance.sina.com.cn/corp/view/vCB_AllBulletinDetail.php?id=12031391&stockid=002096"
      }
    ],
    "description": "河南工业炸药生产销售企业。",
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "高",
      "updatedAt": "2026-06-08",
      "summary": "上市公司公告和定期报告可支撑工业炸药与收购线索；官网、招聘、薪资和作息均缺可靠公开证据。",
      "verifiedFields": [
        "企业名称和河南区域线索",
        "工业炸药生产销售业务线索",
        "易普力收购51%股份公告线索",
        "上市公司定期报告中的投资进展线索"
      ],
      "pendingFields": [
        "企业官网或官方公众号",
        "最新招聘公告和岗位明细",
        "股权过户后的企业性质和签约主体",
        "薪资、作息和生产基地地点"
      ]
    },
    "research": {
      "updatedAt": "2026-06-08",
      "status": "上市公司公告和定期报告已整理，但目标企业官网与招聘证据不足。",
      "relevanceLevel": "高",
      "conclusion": "易普力公告和定期报告显示，松光做工业炸药生产销售，承担河南区域民爆产能，对口度较高。缺目标企业官网和可靠招聘公告，岗位、学历、薪资、作息、生产基地和签约主体（待核对）。",
      "keySignals": [
        "巨潮资讯披露易普力收购松光民爆51%股份公告。",
        "公告材料提到工业炸药生产销售业务线索。",
        "定期报告继续出现松光民爆投资进展线索。",
        "公开资料未发现可靠校招或社招公告。"
      ],
      "suitableFor": [
        "关注河南区域民爆器材生产的学生。",
        "需要研究上市公司民爆产能整合的学生。",
        "愿意等待官网或招聘公告补证的求职学生。"
      ],
      "risks": [
        "缺少目标企业官网或官方公众号入口。",
        "没有可靠公开招聘公告，不能判断岗位开放情况。",
        "股权变更后的企业性质和签约主体需复核。",
        "薪资、作息和工作地点没有可靠公开口径。"
      ],
      "sources": [
        {
          "title": "巨潮资讯：易普力关于收购河南省松光民爆51%股份的公告",
          "type": "新闻资料",
          "date": "2025-03-27",
          "url": "https://static.cninfo.com.cn/finalpage/2025-03-27/1222912401.PDF"
        },
        {
          "title": "新浪财经：易普力收购河南省松光民爆公告",
          "type": "新闻资料",
          "date": "2025-03-27",
          "url": "https://money.finance.sina.com.cn/corp/view/vCB_AllBulletinDetail.php?id=10811129&stockid=002096"
        },
        {
          "title": "上海证券报：易普力收购河南省松光民爆公告",
          "type": "新闻资料",
          "date": "2025-03-27",
          "url": "https://paper.cnstock.com/html/2025-03/27/content_2040805.htm"
        },
        {
          "title": "巨潮资讯：易普力2025年半年度报告全文",
          "type": "新闻资料",
          "date": "2025-08-29",
          "url": "https://static.cninfo.com.cn/finalpage/2025-08-29/1224605072.PDF"
        },
        {
          "title": "新浪财经：易普力2025年年度报告",
          "type": "新闻资料",
          "date": "2026-03-28",
          "url": "https://money.finance.sina.com.cn/corp/view/vCB_AllBulletinDetail.php?id=12031391&stockid=002096"
        }
      ]
    }
  },
  {
    "id": 28,
    "name": "四川通达化工有限责任公司",
    "ownership": "待核对",
    "city": "达州",
    "region": "四川",
    "salaryRange": "未知",
    "schedule": "待核对",
    "scaleOrIndustry": "民爆器材 / 化工制造",
    "highlights": [
      "民爆器材",
      "雅化集团线索",
      "四川区域",
      "安全检查线索"
    ],
    "positions": "化工安全、生产管理等历史岗位线索",
    "education": "待核对",
    "website": "",
    "links": [
      {
        "title": "雅化集团股权收购公告",
        "type": "新闻资料",
        "url": "http://vip.stock.finance.sina.com.cn/corp/view/vCB_AllBulletinDetail.php?stockid=002497&id=9326933"
      },
      {
        "title": "乐山市政府环境影响评价公示",
        "type": "政府资料",
        "url": "https://www.leshan.gov.cn/lsswszf/hpslgs/45886f256cf24652b06219d4efa5e08c/ad80faf66d9d4bcd963c21796ad6b202.pdf"
      },
      {
        "title": "四川省安全检查资料",
        "type": "政府资料",
        "url": "https://www.scjg.gov.cn/news/3381.html"
      },
      {
        "title": "四川雅化实业集团官网",
        "type": "官网",
        "url": "https://www.scyahua.com/",
        "note": "用于核对上级集团背景，不能替代目标企业招聘公告。"
      },
      {
        "title": "雅化集团公告入口",
        "type": "新闻资料",
        "url": "https://money.finance.sina.com.cn/corp/go.php/vCB_Bulletin/stockid/002497.phtml"
      }
    ],
    "description": "四川区域民爆器材生产线索企业。",
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "中",
      "updatedAt": "2026-06-08",
      "summary": "上市公司公告、政府公示和安全检查资料可支撑民爆相关线索；官网、招聘和岗位细节仍需复核。",
      "verifiedFields": [
        "企业名称和四川区域线索",
        "雅化集团股权收购线索",
        "民爆器材生产和项目公示线索",
        "政府安全检查或监管资料线索"
      ],
      "pendingFields": [
        "企业官网或官方公众号",
        "最新招聘公告和岗位明细",
        "薪资范围",
        "作息、生产基地和签约主体"
      ]
    },
    "research": {
      "updatedAt": "2026-06-08",
      "status": "政府资料和上市公司公告已整理，招聘信息不足，需后续复查。",
      "relevanceLevel": "中",
      "conclusion": "公开公告和政府公示显示，四川通达化工与民爆器材生产、项目建设和雅化集团股权整合存在关联，和弹药工程、民爆安全方向有一定相关度。但缺少目标企业官网和可靠招聘公告，岗位、薪资、作息、生产基地和签约主体均需复核。",
      "keySignals": [
        "上市公司公告提供股权收购线索。",
        "政府公示涉及民爆生产项目线索。",
        "安全检查资料提示民爆监管属性。",
        "上级集团官网可用于核对集团背景。"
      ],
      "suitableFor": [
        "关注四川区域民爆生产的学生。",
        "对化工安全和民爆制造有兴趣的学生。",
        "愿意后续核对生产基地和岗位公告的求职学生。"
      ],
      "risks": [
        "缺少目标企业官网和官方招聘入口。",
        "历史公告不能代表当前招聘状态。",
        "工作地点可能涉及分公司或生产基地。",
        "薪资和作息没有可靠公开口径。"
      ],
      "sources": [
        {
          "title": "雅化集团关于收购四川通达化工有限责任公司股权公告",
          "type": "新闻资料",
          "date": "2023年7月",
          "url": "http://vip.stock.finance.sina.com.cn/corp/view/vCB_AllBulletinDetail.php?stockid=002497&id=9326933"
        },
        {
          "title": "乐山市政府峨边分公司环境影响评价公示",
          "type": "政府资料",
          "date": "2022年",
          "url": "https://www.leshan.gov.cn/lsswszf/hpslgs/45886f256cf24652b06219d4efa5e08c/ad80faf66d9d4bcd963c21796ad6b202.pdf"
        },
        {
          "title": "四川省安全检查资料",
          "type": "政府资料",
          "date": "2025-05-26",
          "url": "https://www.scjg.gov.cn/news/3381.html"
        },
        {
          "title": "四川雅化实业集团官网",
          "type": "官网",
          "date": "2026-06-08访问",
          "url": "https://www.scyahua.com/"
        },
        {
          "title": "新浪财经雅化集团公告入口",
          "type": "新闻资料",
          "date": "待核对",
          "url": "https://money.finance.sina.com.cn/corp/go.php/vCB_Bulletin/stockid/002497.phtml"
        }
      ]
    }
  },
  {
    "id": 29,
    "name": "山东圣世达化工有限责任公司",
    "ownership": "待核对",
    "city": "淄博",
    "region": "山东",
    "salaryRange": "未知",
    "schedule": "待核对",
    "scaleOrIndustry": "民爆器材 / 智能装备",
    "highlights": [
      "民爆器材",
      "金奥博线索",
      "淄博区域",
      "招聘入口"
    ],
    "positions": "设备管理、生产技术等历史岗位线索",
    "education": "待核对",
    "website": "http://www.sdssd.cn",
    "links": [
      {
        "title": "山东圣世达化工有限责任公司官网",
        "type": "官网",
        "url": "http://www.sdssd.cn"
      },
      {
        "title": "金奥博集团成员资料",
        "type": "官网",
        "url": "https://www.kingexplorer.com/SolutionSt_sdssd.html"
      },
      {
        "title": "金奥博官网",
        "type": "官网",
        "url": "https://www.kingexplorer.com/"
      },
      {
        "title": "淄博市博山区政府项目备案资料",
        "type": "政府资料",
        "url": "http://www.boshan.gov.cn/gongkai/site_bsqfzhggj/channel_61af2fbee122a9130cc00978/doc_61b1cfe39417ebd91090d757.html"
      },
      {
        "title": "猎聘招聘入口",
        "type": "招聘入口",
        "url": "https://m.liepin.com/company/12710681/"
      }
    ],
    "description": "淄博民爆器材生产线索企业。",
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "中",
      "updatedAt": "2026-06-08",
      "summary": "企业官网、控股集团资料、政府项目备案和招聘入口可支撑民爆相关线索；最新校招和薪资作息仍需复查。",
      "verifiedFields": [
        "企业名称和官网入口",
        "金奥博集团相关线索",
        "淄博项目备案资料线索",
        "招聘平台历史岗位入口"
      ],
      "pendingFields": [
        "官网页面最新可访问性",
        "最新校招公告和岗位明细",
        "企业性质和控股关系最新状态",
        "薪资、作息和工作地点"
      ]
    },
    "research": {
      "updatedAt": "2026-06-08",
      "status": "官网、集团资料、政府备案和招聘入口已整理，最新招聘仍需复查。",
      "relevanceLevel": "中",
      "conclusion": "做民爆器材生产，属金奥博集团产业链，有淄博区域项目备案，对口民爆制造和工艺安全。招聘信号偏平台入口，岗位多落在生产与工艺线；最新校招、薪资、作息和签约主体（待核对）。",
      "keySignals": [
        "目标企业官网可作为主体入口。",
        "金奥博集团资料提供成员企业线索。",
        "博山区政府资料提供项目备案线索。",
        "招聘平台出现历史岗位入口。"
      ],
      "suitableFor": [
        "关注民爆器材和工艺制造的学生。",
        "愿意到山东淄博区域就业的求职学生。",
        "需要核对集团与子公司签约主体的学生。"
      ],
      "risks": [
        "招聘平台信息不能代表当前仍在招聘。",
        "官网内容和最新岗位需人工复查。",
        "集团、子公司和签约单位可能不同。",
        "薪资和作息没有可靠公开口径。"
      ],
      "sources": [
        {
          "title": "山东圣世达化工有限责任公司官网",
          "type": "官网",
          "date": "待核对",
          "url": "http://www.sdssd.cn"
        },
        {
          "title": "金奥博集团山东圣世达资料",
          "type": "官网",
          "date": "待核对",
          "url": "https://www.kingexplorer.com/SolutionSt_sdssd.html"
        },
        {
          "title": "金奥博官网",
          "type": "官网",
          "date": "2026-06-08访问",
          "url": "https://www.kingexplorer.com/"
        },
        {
          "title": "淄博市博山区政府项目备案资料",
          "type": "政府资料",
          "date": "2021年",
          "url": "http://www.boshan.gov.cn/gongkai/site_bsqfzhggj/channel_61af2fbee122a9130cc00978/doc_61b1cfe39417ebd91090d757.html"
        },
        {
          "title": "猎聘山东圣世达招聘入口",
          "type": "招聘入口",
          "date": "待核对",
          "url": "https://m.liepin.com/company/12710681/"
        }
      ]
    }
  },
  {
    "id": 30,
    "name": "重庆建设工业（集团）有限责任公司",
    "ownership": "国企",
    "city": "重庆",
    "region": "重庆",
    "salaryRange": "未知",
    "schedule": "待核对",
    "scaleOrIndustry": "军工制造 / 轻武器装备",
    "highlights": [
      "军工制造",
      "轻武器装备",
      "国资招聘",
      "重庆区域"
    ],
    "positions": "产品设计、工艺研究、设备维修等历史岗位线索",
    "education": "本科及以上（待核对）",
    "website": "",
    "links": [
      {
        "title": "国务院国资委校园招聘公告",
        "type": "招聘公告",
        "url": "http://www.sasac.gov.cn/n2588035/n2588325/n2588350/c31731319/content.html"
      },
      {
        "title": "中国石油大学就业中心企业页",
        "type": "学校就业网",
        "url": "https://career.cup.edu.cn/company/view/id/407213"
      },
      {
        "title": "中国兵器装备集团官网",
        "type": "官网",
        "url": "https://www.csgc.com.cn/",
        "note": "用于核对上级集团背景。"
      },
      {
        "title": "猎聘招聘入口",
        "type": "招聘入口",
        "url": "https://www.liepin.com/company/8220382/"
      },
      {
        "title": "建设工业集团招聘线索",
        "type": "招聘入口",
        "url": "https://campus.51job.com/jianshegongye/"
      }
    ],
    "description": "重庆军工制造和轻武器装备企业。",
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "中",
      "updatedAt": "2026-06-08",
      "summary": "国资委招聘公告、学校就业网和招聘入口可支撑军工制造及岗位线索；是否直接涉及弹药/火工品仍需复查。",
      "verifiedFields": [
        "企业名称和重庆区域线索",
        "国务院国资委校园招聘公告线索",
        "学校就业网企业页线索",
        "产品设计、工艺等历史岗位线索"
      ],
      "pendingFields": [
        "企业官网或官方公众号",
        "最新校招公告和岗位明细",
        "与弹药、火工品或试验验证的直接关联",
        "薪资、作息、多基地分配和涉密要求"
      ]
    },
    "research": {
      "updatedAt": "2026-06-08",
      "status": "国资委招聘公告和学校就业网已整理，按中等对口处理。",
      "relevanceLevel": "中",
      "conclusion": "公开招聘公告和学校就业网显示，重庆建设工业做军工制造、轻武器装备和工艺技术，和弹药工程属间接关联。未确认直接做民爆或火工品业务，薪资、作息、多基地分配和涉密要求（待核对）。",
      "keySignals": [
        "国务院国资委网站发布过校园招聘公告。",
        "学校就业网提供企业和招聘线索。",
        "岗位线索涉及产品设计、工艺研究等方向。",
        "上级集团背景可通过兵器装备集团官网核对。"
      ],
      "suitableFor": [
        "关注军工制造和装备工艺方向的学生。",
        "希望在重庆区域就业的求职学生。",
        "能接受涉密和厂区分配复核的学生。"
      ],
      "risks": [
        "偏军工制造，不是民爆核心单位，岗位按装备制造口径判断。",
        "历史招聘公告不能代表当前岗位开放。",
        "缺少目标企业独立官网入口。",
        "薪资、作息和涉密要求没有可靠公开口径。"
      ],
      "sources": [
        {
          "title": "国务院国资委建设工业2025秋季校园招聘公告",
          "type": "招聘公告",
          "date": "2024-09-24",
          "url": "http://www.sasac.gov.cn/n2588035/n2588325/n2588350/c31731319/content.html"
        },
        {
          "title": "中国石油大学就业中心重庆建设工业企业页",
          "type": "学校就业网",
          "date": "待核对",
          "url": "https://career.cup.edu.cn/company/view/id/407213"
        },
        {
          "title": "中国兵器装备集团官网",
          "type": "官网",
          "date": "2026-06-08访问",
          "url": "https://www.csgc.com.cn/"
        },
        {
          "title": "猎聘重庆建设工业招聘入口",
          "type": "招聘入口",
          "date": "待核对",
          "url": "https://www.liepin.com/company/8220382/"
        },
        {
          "title": "建设工业集团校园招聘入口",
          "type": "招聘入口",
          "date": "待核对",
          "url": "https://campus.51job.com/jianshegongye/"
        }
      ]
    }
  },
  {
    "id": 31,
    "name": "福建海峡科化股份有限公司",
    "ownership": "国企",
    "city": "永安市",
    "region": "福建省",
    "salaryRange": "样本值（待核对）",
    "schedule": "待核对",
    "scaleOrIndustry": "民爆军工 / 爆破服务",
    "highlights": [
      "民爆产品",
      "武器装备科研生产",
      "爆破服务",
      "国企"
    ],
    "positions": "历史岗位样本：技术、研发、安全、设备管理（待核对）",
    "education": "本科及以上（历史样本，待核对）",
    "website": "http://hxkh.com/",
    "links": [
      {
        "title": "福建海峡科化股份有限公司官网",
        "type": "官网",
        "url": "http://hxkh.com/",
        "note": "企业公告、产品和公开资料入口。"
      },
      {
        "title": "2026届校园招聘简章",
        "type": "招聘公告",
        "url": "https://www.bluenav.org/info/1143/7851.htm",
        "note": "高校就业网转载的历史招聘样本，岗位和待遇（待核对）。"
      },
      {
        "title": "2025年校园招聘公告",
        "type": "招聘公告",
        "url": "http://www.fndic.cn/doc/release?resourceId=dc6756ffc0625a5&resourceType=3",
        "note": "历史招聘样本。"
      },
      {
        "title": "历史招聘公告",
        "type": "招聘公告",
        "url": "http://www.hxkh.com/doc/release?resourceId=8189",
        "note": "历史岗位入口，不能代表当前仍在招聘。"
      },
      {
        "title": "福建海峡科化公开资料词条",
        "type": "其他",
        "url": "https://baike.baidu.com/item/%E7%A6%8F%E5%BB%BA%E6%B5%B7%E5%B3%A1%E7%A7%91%E5%8C%96%E8%82%A1%E4%BB%BD%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8/4912550",
        "note": "其他 · 待核对"
      }
    ],
    "description": "福建国资民爆军工和爆破服务企业。",
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "高",
      "updatedAt": "2026-06-08",
      "summary": "官网和历史招聘样本可支撑企业方向与招聘线索，最新岗位、薪资和作息仍需复查。",
      "verifiedFields": [
        "企业全称",
        "官网入口",
        "民爆产品和爆破服务方向",
        "历史招聘样本"
      ],
      "pendingFields": [
        "最新校招公告",
        "薪资口径",
        "作息安排",
        "签约主体和工作地点"
      ]
    },
    "research": {
      "updatedAt": "2026-06-08",
      "status": "官网和历史招聘入口已整理，最新招聘细节仍需核对。",
      "relevanceLevel": "高",
      "conclusion": "业务涉及民用爆炸物品、武器装备科研生产和爆破服务，对口弹药工程、爆破工程和安全技术。历史招聘出现过技术、研发、安全、设备管理岗位；薪资、作息、地点和当前岗位（待核对）。",
      "keySignals": [
        "官网提供企业公告和业务资料入口。",
        "历史招聘样本出现技术、研发和安全管理岗位线索。",
        "业务方向包括民爆产品和爆破服务。",
        "工作地点可能涉及总部和分支单位。"
      ],
      "suitableFor": [
        "关注民爆产品生产的学生",
        "关注爆破服务和安全管理方向的学生",
        "希望了解福建区域国企岗位的学生"
      ],
      "risks": [
        "历史招聘公告不能代表当前仍在招聘。",
        "薪资样本（待核对）。",
        "签约主体和工作地点可能随分公司变化。",
        "作息和现场岗位要求未核验。"
      ],
      "sources": [
        {
          "title": "福建海峡科化股份有限公司官网",
          "type": "官网",
          "date": "待核对",
          "url": "http://hxkh.com/"
        },
        {
          "title": "2026届校园招聘简章",
          "type": "招聘公告",
          "date": "2025-10-22",
          "url": "https://www.bluenav.org/info/1143/7851.htm"
        },
        {
          "title": "2025年校园招聘公告",
          "type": "招聘公告",
          "date": "2024-11-06",
          "url": "http://www.fndic.cn/doc/release?resourceId=dc6756ffc0625a5&resourceType=3"
        },
        {
          "title": "福建海峡科化历史招聘公告",
          "type": "招聘公告",
          "date": "2023",
          "url": "http://www.hxkh.com/doc/release?resourceId=8189"
        },
        {
          "title": "福建海峡科化公开资料词条",
          "type": "其他",
          "date": "待核对",
          "url": "https://baike.baidu.com/item/%E7%A6%8F%E5%BB%BA%E6%B5%B7%E5%B3%A1%E7%A7%91%E5%8C%96%E8%82%A1%E4%BB%BD%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8/4912550"
        }
      ]
    }
  },
  {
    "id": 32,
    "name": "陕西红旗民爆集团股份有限公司",
    "ownership": "国企",
    "city": "宝鸡市",
    "region": "陕西省",
    "salaryRange": "未知",
    "schedule": "待核对",
    "scaleOrIndustry": "民爆产品 / 爆破服务",
    "highlights": [
      "工业炸药",
      "爆破服务",
      "官网入口",
      "校招线索"
    ],
    "positions": "历史岗位样本：爆破工程、工艺、安全、设备方向（待核对）",
    "education": "待核对",
    "website": "https://hqmb.com.cn",
    "links": [
      {
        "title": "陕西红旗民爆集团官网",
        "type": "官网",
        "url": "https://hqmb.com.cn",
        "note": "企业官网入口。"
      },
      {
        "title": "陕西省市场监督管理局股权收购公示",
        "type": "政府资料",
        "url": "https://snamr.shaanxi.gov.cn/sy/ztzl/cjscgpjz/jyzjz/ajgs/jyzjzjyajgs/202408/t20240822_2615385.html",
        "note": "股权相关公开资料。"
      },
      {
        "title": "长安大学校园宣讲会信息",
        "type": "招聘公告",
        "url": "https://m.haitou.cc/xjh/2041138/",
        "note": "历史校园宣讲线索。"
      },
      {
        "title": "宝鸡市民用爆破器材行业协会",
        "type": "其他",
        "url": "http://bjmbxh.com/",
        "note": "行业资料入口。"
      },
      {
        "title": "陕西红旗民爆公开资料词条",
        "type": "其他",
        "url": "https://baike.baidu.com/item/%E9%99%95%E8%A5%BF%E7%BA%A2%E6%97%97%E6%B0%91%E7%88%86%E9%9B%86%E5%9B%A2%E8%82%A1%E4%BB%BD%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8/10231315",
        "note": "其他 · 待核对"
      }
    ],
    "description": "宝鸡民爆产品和爆破服务企业。",
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "高",
      "updatedAt": "2026-06-08",
      "summary": "官网、政府公示和校园宣讲线索可支撑企业方向，最新招聘和股权口径仍需复查。",
      "verifiedFields": [
        "企业全称",
        "官网入口",
        "工业炸药和爆破服务方向",
        "历史校园宣讲线索"
      ],
      "pendingFields": [
        "当前股权归属",
        "最新招聘岗位",
        "薪资范围",
        "作息安排",
        "工作地点"
      ]
    },
    "research": {
      "updatedAt": "2026-06-08",
      "status": "官网和历史招聘线索已整理，最新招聘与待遇信息不足。",
      "relevanceLevel": "高",
      "conclusion": "业务涉及工业炸药、爆破服务等民爆方向，对口弹药工程、爆破工程和安全技术。已有高校宣讲和政府公示线索；最新校招、薪资、作息（待核对），股权和签约主体口径需单独核对。",
      "keySignals": [
        "企业官网提供公开入口。",
        "政府公示显示股权相关资料。",
        "高校宣讲信息提供历史招聘线索。",
        "业务方向集中在工业炸药和爆破服务。"
      ],
      "suitableFor": [
        "关注陕西区域民爆企业的学生",
        "关注爆破工程技术方向的学生",
        "关注安全管理和工艺岗位的学生"
      ],
      "risks": [
        "宣讲会信息为历史样本，不能代表当前岗位。",
        "股权归属和签约主体需复查。",
        "薪资、作息和学历要求未形成稳定证据。",
        "部分岗位可能涉及现场或厂区环境。"
      ],
      "sources": [
        {
          "title": "陕西红旗民爆集团官网",
          "type": "官网",
          "date": "待核对",
          "url": "https://hqmb.com.cn"
        },
        {
          "title": "陕西省市场监督管理局收购公示",
          "type": "政府资料",
          "date": "2024-08",
          "url": "https://snamr.shaanxi.gov.cn/sy/ztzl/cjscgpjz/jyzjz/ajgs/jyzjzjyajgs/202408/t20240822_2615385.html"
        },
        {
          "title": "长安大学校园宣讲会信息",
          "type": "招聘公告",
          "date": "2025",
          "url": "https://m.haitou.cc/xjh/2041138/"
        },
        {
          "title": "宝鸡市民用爆破器材行业协会",
          "type": "其他",
          "date": "待核对",
          "url": "http://bjmbxh.com/"
        },
        {
          "title": "陕西红旗民爆公开资料词条",
          "type": "其他",
          "date": "待核对",
          "url": "https://baike.baidu.com/item/%E9%99%95%E8%A5%BF%E7%BA%A2%E6%97%97%E6%B0%91%E7%88%86%E9%9B%86%E5%9B%A2%E8%82%A1%E4%BB%BD%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8/10231315"
        }
      ]
    }
  },
  {
    "id": 33,
    "name": "西藏高争民爆股份有限公司",
    "ownership": "国企",
    "city": "拉萨市",
    "region": "西藏自治区",
    "salaryRange": "未知",
    "schedule": "待核对",
    "scaleOrIndustry": "民爆产品 / 爆破工程",
    "highlights": [
      "上市公司",
      "国资控股",
      "工业炸药",
      "爆破服务"
    ],
    "positions": "待核对",
    "education": "待核对",
    "website": "https://www.xzmbgf.com",
    "links": [
      {
        "title": "西藏高争民爆官网",
        "type": "官网",
        "url": "https://www.xzmbgf.com",
        "note": "企业官网入口。"
      },
      {
        "title": "民爆业务介绍",
        "type": "官网",
        "url": "https://www.xzmbgf.com/Business/Civil",
        "note": "业务方向入口。"
      },
      {
        "title": "中国证监会发行审核资料",
        "type": "政府资料",
        "url": "http://www.csrc.gov.cn/csrc/c100089/c1506813/content.shtml",
        "note": "上市审核相关公开资料。"
      },
      {
        "title": "高争集团民爆业务页",
        "type": "官网",
        "url": "https://www.xzjgjc.com/Business/Civil",
        "note": "集团业务入口。"
      },
      {
        "title": "西藏高争民爆公开资料词条",
        "type": "其他",
        "url": "https://baike.eastmoney.com/item/%E8%A5%BF%E8%97%8F%E9%AB%98%E4%BA%89%E6%B0%91%E7%88%86%E8%82%A1%E4%BB%BD%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8",
        "note": "其他 · 待核对"
      }
    ],
    "description": "西藏国资控股民爆和爆破服务企业。",
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "高",
      "updatedAt": "2026-06-08",
      "summary": "官网、业务页和证监会资料可支撑主体与业务方向，招聘岗位和待遇信息仍不足。",
      "verifiedFields": [
        "企业全称",
        "官网入口",
        "国资控股上市线索",
        "民爆产品和爆破服务方向"
      ],
      "pendingFields": [
        "最新招聘公告",
        "岗位名称",
        "学历要求",
        "薪资范围",
        "作息安排"
      ]
    },
    "research": {
      "updatedAt": "2026-06-08",
      "status": "主体和业务入口已整理，招聘信息不足。",
      "relevanceLevel": "高",
      "conclusion": "业务涉及民用爆炸物品生产、销售、运输和爆破作业服务，对口爆破工程、安全技术和含能材料。现有资料可作入口和方向判断；最新岗位、薪资、作息和工作地点（待核对），投递前确认项目地点。",
      "keySignals": [
        "官网提供企业和业务入口。",
        "业务方向包括民爆产品和爆破服务。",
        "证监会资料可作为主体与上市线索。",
        "工作地点可能覆盖西藏区域。"
      ],
      "suitableFor": [
        "关注西藏区域民爆企业的学生",
        "关注爆破工程和安全技术方向的学生",
        "愿意了解区域国资企业的学生"
      ],
      "risks": [
        "未形成稳定校招入口。",
        "岗位地点可能分散在西藏各地。",
        "现场作业和安全资质要求需核对。",
        "薪资和作息无可靠公开口径。"
      ],
      "sources": [
        {
          "title": "西藏高争民爆官网",
          "type": "官网",
          "date": "待核对",
          "url": "https://www.xzmbgf.com"
        },
        {
          "title": "西藏高争民爆业务介绍",
          "type": "官网",
          "date": "待核对",
          "url": "https://www.xzmbgf.com/Business/Civil"
        },
        {
          "title": "中国证监会首次公开发行审核资料",
          "type": "政府资料",
          "date": "2016",
          "url": "http://www.csrc.gov.cn/csrc/c100089/c1506813/content.shtml"
        },
        {
          "title": "高争集团民爆业务页",
          "type": "官网",
          "date": "待核对",
          "url": "https://www.xzjgjc.com/Business/Civil"
        },
        {
          "title": "西藏高争民爆公开资料词条",
          "type": "其他",
          "date": "待核对",
          "url": "https://baike.eastmoney.com/item/%E8%A5%BF%E8%97%8F%E9%AB%98%E4%BA%89%E6%B0%91%E7%88%86%E8%82%A1%E4%BB%BD%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8"
        }
      ]
    }
  },
  {
    "id": 34,
    "name": "新疆雪峰科技（集团）股份有限公司",
    "ownership": "待核对",
    "city": "乌鲁木齐市",
    "region": "新疆维吾尔自治区",
    "salaryRange": "未知",
    "schedule": "待核对",
    "scaleOrIndustry": "民爆产品 / 爆破工程",
    "highlights": [
      "上市公司",
      "工业炸药",
      "电子雷管",
      "爆破工程"
    ],
    "positions": "待核对",
    "education": "待核对",
    "website": "https://www.xjxfkj.com",
    "links": [
      {
        "title": "新疆雪峰科技官网",
        "type": "官网",
        "url": "https://www.xjxfkj.com",
        "note": "企业官网入口。"
      },
      {
        "title": "东方财富雪峰科技公告入口",
        "type": "新闻资料",
        "url": "https://data.eastmoney.com/notice/603227.html",
        "note": "上市公司公告入口。"
      },
      {
        "title": "猎聘雪峰科技公司页",
        "type": "招聘入口",
        "url": "https://m.liepin.com/company/7921173/",
        "note": "招聘平台入口，岗位需按最新页面复查。"
      },
      {
        "title": "控股股东公开入口",
        "type": "其他",
        "url": "https://www.gdhdkg.com",
        "note": "控股股东相关公开入口。"
      },
      {
        "title": "新疆雪峰科技公开资料词条",
        "type": "其他",
        "url": "https://baike.baidu.com/item/%E6%96%B0%E7%96%86%E9%9B%AA%E5%B3%B0%E7%A7%91%E6%8A%80%EF%BC%88%E9%9B%86%E5%9B%A2%EF%BC%89%E8%82%A1%E4%BB%BD%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8/927336",
        "note": "其他 · 待核对"
      }
    ],
    "description": "新疆民爆产品和爆破服务上市公司。",
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "高",
      "updatedAt": "2026-06-08",
      "summary": "官网、公告和招聘平台入口可支撑主体与业务方向，股权、岗位和待遇仍需复查。",
      "verifiedFields": [
        "企业全称",
        "官网入口",
        "上市公司公告入口",
        "民爆产品和爆破工程方向"
      ],
      "pendingFields": [
        "最新校招岗位",
        "薪资范围",
        "作息安排",
        "签约主体",
        "股权口径"
      ]
    },
    "research": {
      "updatedAt": "2026-06-08",
      "status": "官网和公告入口已整理，招聘细节不足。",
      "relevanceLevel": "高",
      "conclusion": "业务涉及工业炸药、电子雷管、爆破工程和民爆服务，对口弹药工程、爆破工程和安全技术。作为新疆区域民爆入口收录；岗位、薪资、作息（待核对），区域主体和集团口径要分开看。",
      "keySignals": [
        "官网提供企业公开入口。",
        "上市公司公告入口可持续跟踪。",
        "业务方向涉及工业炸药、电子雷管和爆破工程。",
        "招聘平台可作岗位入口线索。"
      ],
      "suitableFor": [
        "关注新疆区域民爆企业的学生",
        "关注工业炸药和电子雷管方向的学生",
        "关注爆破工程服务岗位的学生"
      ],
      "risks": [
        "招聘平台信息不能代表当前校招。",
        "工作地点可能集中在新疆或下属单位。",
        "股权和签约主体（待核对）。",
        "薪资、作息和岗位要求未形成稳定证据。"
      ],
      "sources": [
        {
          "title": "新疆雪峰科技官网",
          "type": "官网",
          "date": "待核对",
          "url": "https://www.xjxfkj.com"
        },
        {
          "title": "东方财富雪峰科技公告入口",
          "type": "新闻资料",
          "date": "待核对",
          "url": "https://data.eastmoney.com/notice/603227.html"
        },
        {
          "title": "猎聘雪峰科技公司页",
          "type": "招聘入口",
          "date": "待核对",
          "url": "https://m.liepin.com/company/7921173/"
        },
        {
          "title": "控股股东公开入口",
          "type": "其他",
          "date": "待核对",
          "url": "https://www.gdhdkg.com"
        },
        {
          "title": "新疆雪峰科技公开资料词条",
          "type": "其他",
          "date": "待核对",
          "url": "https://baike.baidu.com/item/%E6%96%B0%E7%96%86%E9%9B%AA%E5%B3%B0%E7%A7%91%E6%8A%80%EF%BC%88%E9%9B%86%E5%9B%A2%EF%BC%89%E8%82%A1%E4%BB%BD%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8/927336"
        }
      ]
    }
  },
  {
    "id": 35,
    "name": "中煤科工集团淮北爆破技术研究院有限公司",
    "ownership": "国企",
    "city": "淮北市",
    "region": "安徽",
    "salaryRange": "未知",
    "schedule": "待核对",
    "scaleOrIndustry": "民爆研发 / 爆破安全技术",
    "highlights": [
      "央企下属",
      "民爆研发",
      "爆破工程",
      "安全评价"
    ],
    "positions": "检验、安全评价、爆破工程技术研发等历史岗位样本",
    "education": "本科及以上，硕士岗位较多（招聘样本，待核对）",
    "website": "https://www.hbccri.com/",
    "links": [
      {
        "title": "淮北爆破技术研究院官网",
        "type": "官网",
        "url": "https://www.hbccri.com/",
        "note": "企业官网入口。"
      },
      {
        "title": "2026年招聘简章PDF",
        "type": "招聘公告",
        "url": "https://www.hbccri.com/upload/file/20250916/20250916162948_19959.pdf",
        "note": "官网发布的招聘简章，岗位和学历需按公告口径复查。"
      },
      {
        "title": "湖北高校就业网络联盟公司页",
        "type": "学校就业网",
        "url": "https://www.91wllm.cn/campusUnion/view/id/947295/mark/0",
        "note": "就业平台入口，作为招聘线索。"
      },
      {
        "title": "淮北新闻网招聘信息",
        "type": "新闻资料",
        "url": "https://www.hbnews.net/hbyw/2025/04-01/K18gwQkM.html",
        "note": "地方新闻转载招聘简章，内容（待核对）。"
      },
      {
        "title": "淮北爆破技术研究院新闻资讯入口",
        "type": "官网",
        "url": "https://www.hbccri.com/info.php?class_id=102102",
        "note": "官网 · 待核对"
      }
    ],
    "description": "民爆器材与爆破安全技术科研机构。",
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "高",
      "updatedAt": "2026-06-08",
      "summary": "官网和招聘简章可支撑主体、业务方向和招聘样本，薪资、作息和岗位有效期仍需复查。",
      "verifiedFields": [
        "企业全称",
        "官网入口",
        "央企下属关系",
        "民爆器材、爆破工程和安全技术方向",
        "招聘简章入口"
      ],
      "pendingFields": [
        "最新岗位是否仍开放",
        "薪资范围",
        "作息安排",
        "具体工作地点",
        "签约主体"
      ]
    },
    "research": {
      "updatedAt": "2026-06-08",
      "status": "官网和招聘简章证据较强，待遇细节不足。",
      "relevanceLevel": "高",
      "conclusion": "中煤科工集团淮北爆破技术研究院官网显示，方向为民用爆破器材、爆破工程技术和安全技术，对口弹药、爆破和安全评价。招聘简章提供岗位样本，薪资、作息、岗位有效期和工作地点（待核对）。",
      "keySignals": [
        "官网明确企业主体和业务方向。",
        "招聘简章出现检验、安全评价、爆破工程技术研发等岗位样本。",
        "央企下属科研机构属性较明确。",
        "研究方向覆盖民爆器材、爆破工程和民爆安全技术。"
      ],
      "suitableFor": [
        "关注民爆科研和检测方向的学生",
        "关注爆破工程技术研发的学生",
        "关注安全评价和技术支持岗位的学生"
      ],
      "risks": [
        "招聘简章有时效性，岗位是否仍开放需复查。",
        "薪资和作息未形成稳定公开证据。",
        "部分岗位可能要求硕士或相关资质。",
        "实际工作内容可能包含现场技术支持。"
      ],
      "sources": [
        {
          "title": "中煤科工集团淮北爆破技术研究院有限公司官网",
          "type": "官网",
          "date": "待核对",
          "url": "https://www.hbccri.com/"
        },
        {
          "title": "中煤科工集团淮北爆破技术研究院有限公司招聘简章（2026）",
          "type": "招聘公告",
          "date": "2025-09-16",
          "url": "https://www.hbccri.com/upload/file/20250916/20250916162948_19959.pdf"
        },
        {
          "title": "湖北高校就业网络联盟：中煤科工集团淮北爆破技术研究院有限公司",
          "type": "学校就业网",
          "date": "待核对",
          "url": "https://www.91wllm.cn/campusUnion/view/id/947295/mark/0"
        },
        {
          "title": "淮北新闻网：淮北这家央企，公开招聘",
          "type": "新闻资料",
          "date": "2025-04-01",
          "url": "https://www.hbnews.net/hbyw/2025/04-01/K18gwQkM.html"
        },
        {
          "title": "淮北爆破技术研究院新闻资讯入口",
          "type": "官网",
          "date": "待核对",
          "url": "https://www.hbccri.com/info.php?class_id=102102"
        }
      ]
    }
  },
  {
    "id": 36,
    "name": "鞍钢矿业爆破有限公司",
    "ownership": "待核对",
    "city": "鞍山市",
    "region": "辽宁省",
    "salaryRange": "未知",
    "schedule": "待核对",
    "scaleOrIndustry": "矿山爆破 / 民爆一体化",
    "highlights": [
      "矿山爆破",
      "民爆一体化",
      "校园招聘入口",
      "现场工程"
    ],
    "positions": "矿山爆破、工程技术、安全管理等方向待核对",
    "education": "待核对",
    "website": "https://www.akbaopo.com/",
    "links": [
      {
        "title": "鞍钢矿业爆破有限公司官网",
        "type": "官网",
        "url": "https://www.akbaopo.com/",
        "note": "企业官网入口。"
      },
      {
        "title": "校园招聘页面",
        "type": "招聘入口",
        "url": "https://www.akbaopo.com/job/18/",
        "note": "官网招聘栏目，岗位需按最新页面复查。"
      },
      {
        "title": "人才招聘页面",
        "type": "招聘入口",
        "url": "https://www.akbaopo.com/job/",
        "note": "官网招聘入口。"
      },
      {
        "title": "社会招聘页面",
        "type": "招聘入口",
        "url": "https://www.akbaopo.com/job/19/",
        "note": "官网社招入口。"
      },
      {
        "title": "谈职：鞍钢矿业爆破有限公司招聘入口",
        "type": "招聘入口",
        "url": "https://www.tanzhi.cn/companies/8315c246-7025-45d6-aa4c-1f2e57497bdb/",
        "note": "招聘入口 · 待核对"
      }
    ],
    "description": "矿山爆破和民爆一体化服务企业。",
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "中",
      "updatedAt": "2026-06-08",
      "summary": "官网可支撑主体、业务方向和招聘入口，股权口径、当前岗位、薪资和作息仍需复查。",
      "verifiedFields": [
        "企业全称",
        "官网入口",
        "矿山爆破业务",
        "招聘入口",
        "民爆一体化服务线索"
      ],
      "pendingFields": [
        "股权和企业性质口径",
        "最新校招岗位",
        "薪资范围",
        "作息安排",
        "项目工作地点"
      ]
    },
    "research": {
      "updatedAt": "2026-06-08",
      "status": "官网证据较清楚，但招聘细节仍不足。",
      "relevanceLevel": "中",
      "conclusion": "鞍钢矿业爆破有限公司官网显示其从事矿山爆破、爆破施工和民爆一体化服务，适合补充矿山场景下的爆破工程入口。该企业与弹药工程相关性偏工程应用，当前岗位、薪资、作息和项目地点需要按官网招聘栏目或最新公告复查。",
      "keySignals": [
        "官网提供企业公开入口。",
        "官网设有校园招聘、社会招聘和人才招聘栏目。",
        "业务方向集中在矿山爆破和爆破施工。",
        "工作场景可能更偏项目和现场工程。"
      ],
      "suitableFor": [
        "关注矿山爆破工程的学生",
        "关注现场技术和安全管理的学生",
        "能接受项目制或现场工作的学生"
      ],
      "risks": [
        "岗位可能偏现场工程和项目地工作。",
        "薪资和作息未见稳定公开口径。",
        "股权与企业性质需按最新公开资料复查。",
        "招聘栏目存在但具体开放岗位需重新确认。"
      ],
      "sources": [
        {
          "title": "鞍钢矿业爆破有限公司官网",
          "type": "官网",
          "date": "待核对",
          "url": "https://www.akbaopo.com/"
        },
        {
          "title": "鞍钢矿业爆破有限公司校园招聘页面",
          "type": "招聘入口",
          "date": "待核对",
          "url": "https://www.akbaopo.com/job/18/"
        },
        {
          "title": "鞍钢矿业爆破有限公司人才招聘页面",
          "type": "招聘入口",
          "date": "待核对",
          "url": "https://www.akbaopo.com/job/"
        },
        {
          "title": "鞍钢矿业爆破有限公司社会招聘页面",
          "type": "招聘入口",
          "date": "待核对",
          "url": "https://www.akbaopo.com/job/19/"
        },
        {
          "title": "谈职：鞍钢矿业爆破有限公司招聘入口",
          "type": "招聘入口",
          "date": "待核对",
          "url": "https://www.tanzhi.cn/companies/8315c246-7025-45d6-aa4c-1f2e57497bdb/"
        }
      ]
    }
  },
  {
    "id": 37,
    "name": "青海青乐化工机械有限责任公司",
    "ownership": "待核对",
    "city": "海东市",
    "region": "青海省",
    "salaryRange": "未知",
    "schedule": "待核对",
    "scaleOrIndustry": "民爆器材 / 化工机械",
    "highlights": [
      "青海区域",
      "民爆器材",
      "化工机械",
      "招聘样本"
    ],
    "positions": "技术员、生产或机械相关岗位样本，待核对",
    "education": "本科及以上或专科岗位样本，待核对",
    "website": "",
    "links": [
      {
        "title": "青海工信厅安全生产标准化公告",
        "type": "政府资料",
        "url": "https://gxt.qinghai.gov.cn/1887702550763384833.html",
        "note": "政府公告入口，可支撑主体线索。"
      },
      {
        "title": "福建省机电控股校园招聘公告",
        "type": "招聘公告",
        "url": "http://www.fndic.cn/doc/release?resourceId=dc6756ffc0625a5&resourceType=3",
        "note": "含青海青乐相关招聘线索，需复查岗位有效期。"
      },
      {
        "title": "青海夏都人才网企业页",
        "type": "招聘入口",
        "url": "https://www.qhxdrcw.com/wap/c_company-a_show-id_7101.html",
        "note": "招聘平台入口。"
      },
      {
        "title": "乐都区就业服务局招聘信息",
        "type": "招聘公告",
        "url": "https://www.sohu.com/a/683643060_121106869",
        "note": "历史招聘线索（待核对）。"
      },
      {
        "title": "青海省工业和信息化厅公开入口",
        "type": "政府资料",
        "url": "https://gxt.qinghai.gov.cn/",
        "note": "政府资料 · 待核对"
      }
    ],
    "description": "青海民爆器材和化工机械相关企业。",
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "中",
      "updatedAt": "2026-06-08",
      "summary": "政府公告和招聘线索可支撑主体与区域入口，官网、股权、岗位、薪资和作息仍需复查。",
      "verifiedFields": [
        "企业全称",
        "青海海东区域",
        "政府公告入口",
        "历史招聘线索",
        "民爆和化工机械方向线索"
      ],
      "pendingFields": [
        "官网入口",
        "企业性质和股权口径",
        "最新招聘岗位",
        "薪资范围",
        "作息安排"
      ]
    },
    "research": {
      "updatedAt": "2026-06-08",
      "status": "政府公告和招聘线索可用，缺少官网和最新校招细节。",
      "relevanceLevel": "中",
      "conclusion": "青海青乐化工机械有限责任公司可作为青海区域民爆器材和化工机械方向入口。现有证据以政府公告、集团招聘公告和地方招聘线索为主，相关性存在但不宜扩写为稳定校招单位；官网、股权、岗位、薪资和作息需后续复查。",
      "keySignals": [
        "青海工信厅公告中出现企业主体线索。",
        "福建省机电控股招聘公告提供历史招聘入口。",
        "地方招聘平台出现技术员等岗位线索。",
        "区域上补足青海民爆相关企业入口。"
      ],
      "suitableFor": [
        "关注青海区域就业的学生",
        "关注民爆器材生产线索的学生",
        "关注化工机械和现场技术岗位的学生"
      ],
      "risks": [
        "未找到企业官网，信息更新依赖政府和招聘平台。",
        "最新岗位是否开放需要复查。",
        "企业性质和股权口径需核对。",
        "薪资和作息没有稳定公开证据。"
      ],
      "sources": [
        {
          "title": "青海省国防科学技术工业办公室公告",
          "type": "政府资料",
          "date": "2025-02-06",
          "url": "https://gxt.qinghai.gov.cn/1887702550763384833.html"
        },
        {
          "title": "福建省机电（控股）有限责任公司2025年校园招聘公告",
          "type": "招聘公告",
          "date": "2024-11-06",
          "url": "http://www.fndic.cn/doc/release?resourceId=dc6756ffc0625a5&resourceType=3"
        },
        {
          "title": "青海夏都人才网：青海青乐化工机械有限责任公司",
          "type": "招聘入口",
          "date": "待核对",
          "url": "https://www.qhxdrcw.com/wap/c_company-a_show-id_7101.html"
        },
        {
          "title": "乐都区就业服务局就业信息",
          "type": "招聘公告",
          "date": "2023-06-09",
          "url": "https://www.sohu.com/a/683643060_121106869"
        },
        {
          "title": "青海省工业和信息化厅公开入口",
          "type": "政府资料",
          "date": "待核对",
          "url": "https://gxt.qinghai.gov.cn/"
        }
      ]
    }
  },
  {
    "id": 38,
    "name": "宁夏天长民爆器材有限责任公司",
    "ownership": "待核对",
    "city": "石嘴山市",
    "region": "宁夏回族自治区",
    "salaryRange": "未知",
    "schedule": "待核对",
    "scaleOrIndustry": "民爆器材 / 电子雷管",
    "highlights": [
      "宁夏区域",
      "民爆生产",
      "电子雷管",
      "政府许可资料"
    ],
    "positions": "待核对",
    "education": "待核对",
    "website": "",
    "links": [
      {
        "title": "宁夏工信厅安全生产许可证批复",
        "type": "政府资料",
        "url": "https://gxt.nx.gov.cn/zwgk/fdzdgknr/glfw/xzxk/202110/t20211019_3617843.html",
        "note": "政府许可资料，可支撑民爆生产线索。"
      },
      {
        "title": "宁夏工信厅行政许可栏目",
        "type": "政府资料",
        "url": "https://gxt.nx.gov.cn/zwgk/fdzdgknr/glfw/",
        "note": "可跟踪后续许可证变更。"
      },
      {
        "title": "惠农区人民政府企业信息",
        "type": "政府资料",
        "url": "https://www.huinong.gov.cn/tzhn/sqxx/202404/t20240424_4521012.html",
        "note": "地方政府企业信息入口。"
      },
      {
        "title": "宁夏天长民爆安全生产资料PDF",
        "type": "政府资料",
        "url": "https://gxt.nx.gov.cn/zwgk/fdzdgknr/zdlygk/aqsc/202408/P020240826341958789208.pdf",
        "note": "安全生产相关公开资料，需按原文核对。"
      },
      {
        "title": "公司工商注册信息",
        "type": "其他",
        "url": "https://www.qixin.com/company/74830ffe-c047-4dde-9853-ae100a196f7b",
        "note": "其他 · 待核对"
      }
    ],
    "description": "宁夏民爆器材生产和爆破相关企业。",
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "中",
      "updatedAt": "2026-06-08",
      "summary": "政府许可和地方政府信息可支撑主体与民爆方向，官网、招聘岗位、薪资和作息未形成证据。",
      "verifiedFields": [
        "企业全称",
        "宁夏石嘴山区域",
        "民爆生产许可线索",
        "电子雷管和炸药产能调整线索"
      ],
      "pendingFields": [
        "官网入口",
        "当前股权口径",
        "最新招聘岗位",
        "薪资范围",
        "作息安排"
      ]
    },
    "research": {
      "updatedAt": "2026-06-08",
      "status": "政府资料较稳，招聘信息不足。",
      "relevanceLevel": "中",
      "conclusion": "宁夏天长民爆器材有限责任公司在宁夏工信厅许可资料和地方政府信息中可追踪，方向涉及民用爆炸物品生产、电子雷管和炸药产能调整。该条目适合补充宁夏区域民爆入口，但未见官网和公开校招，岗位、薪资、作息和股权口径需要后续复查。",
      "keySignals": [
        "宁夏工信厅有民用爆炸物品安全生产许可证批复。",
        "行政许可栏目可继续跟踪许可证变更。",
        "惠农区政府信息提供企业所在地线索。",
        "业务方向与民爆生产和电子雷管相关。"
      ],
      "suitableFor": [
        "关注宁夏区域民爆企业的学生",
        "关注电子雷管和炸药生产线索的学生",
        "需要查找地方民爆企业入口的学生"
      ],
      "risks": [
        "未找到企业官网和公开校招入口。",
        "工作地点可能较固定，岗位开放度需确认。",
        "股权和签约主体需按最新资料复查。",
        "薪资、作息和学历要求没有公开稳定来源。"
      ],
      "sources": [
        {
          "title": "宁夏工信厅关于宁夏天长民爆器材有限责任公司换发民用爆炸物品安全生产许可证的批复",
          "type": "政府资料",
          "date": "2021-10-19",
          "url": "https://gxt.nx.gov.cn/zwgk/fdzdgknr/glfw/xzxk/202110/t20211019_3617843.html"
        },
        {
          "title": "宁夏工信厅行政许可栏目",
          "type": "政府资料",
          "date": "待核对",
          "url": "https://gxt.nx.gov.cn/zwgk/fdzdgknr/glfw/"
        },
        {
          "title": "惠农区人民政府企业信息",
          "type": "政府资料",
          "date": "2024-04-24",
          "url": "https://www.huinong.gov.cn/tzhn/sqxx/202404/t20240424_4521012.html"
        },
        {
          "title": "宁夏天长民爆安全生产资料PDF",
          "type": "政府资料",
          "date": "2024-08",
          "url": "https://gxt.nx.gov.cn/zwgk/fdzdgknr/zdlygk/aqsc/202408/P020240826341958789208.pdf"
        },
        {
          "title": "公司工商注册信息",
          "type": "其他",
          "date": "待核对",
          "url": "https://www.qixin.com/company/74830ffe-c047-4dde-9853-ae100a196f7b"
        }
      ]
    }
  },
  {
    "id": 39,
    "name": "北方爆破科技有限公司",
    "ownership": "国企",
    "city": "北京市",
    "region": "北京市",
    "salaryRange": "未知",
    "schedule": "待核对",
    "scaleOrIndustry": "现场混装炸药 / 工程爆破",
    "highlights": [
      "兵器集团线索",
      "工程爆破",
      "现场混装炸药",
      "校招样本"
    ],
    "positions": "采矿工程师、爆破工程师等招聘样本，待核对",
    "education": "硕士岗位样本较多，待核对",
    "website": "",
    "links": [
      {
        "title": "国家大学生就业服务平台岗位页",
        "type": "招聘公告",
        "url": "https://www.ncss.cn/student/jobs/21dPqgiEjj9ajmSqcA8yzz/detail.html",
        "note": "2026届招聘岗位样本，需按最新页面复查。"
      },
      {
        "title": "东北大学就业网招聘公告",
        "type": "学校就业网",
        "url": "http://job.neu.edu.cn/campus/view/id/561499",
        "note": "学校就业网公告入口。"
      },
      {
        "title": "东北大学就业网公司页",
        "type": "学校就业网",
        "url": "http://job.neu.edu.cn/company/view/id/526389",
        "note": "学校就业网公司入口。"
      },
      {
        "title": "独秀就业招聘公告",
        "type": "招聘公告",
        "url": "https://www.dooynet.com/campus/view/id/585213",
        "note": "招聘公告入口，薪资只作为岗位样本线索。"
      },
      {
        "title": "北方爆破科技有限公司公开资料词条",
        "type": "其他",
        "url": "https://baike.baidu.com/item/%E5%8C%97%E6%96%B9%E7%88%86%E7%A0%B4%E7%A7%91%E6%8A%80%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8/19837294",
        "note": "其他 · 待核对"
      }
    ],
    "description": "工程爆破和现场混装炸药相关企业。",
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "高",
      "updatedAt": "2026-06-08",
      "summary": "学校就业网和国家平台可支撑招聘样本，官网、薪资、作息、项目地点和签约主体仍需复查。",
      "verifiedFields": [
        "企业全称",
        "北京区域线索",
        "兵器集团关联线索",
        "工程爆破和现场混装炸药方向",
        "招聘岗位样本"
      ],
      "pendingFields": [
        "官网入口",
        "签约主体",
        "最新岗位有效期",
        "薪资范围",
        "作息安排",
        "项目工作地点"
      ]
    },
    "research": {
      "updatedAt": "2026-06-08",
      "status": "招聘入口较多，官网和待遇细节不足。",
      "relevanceLevel": "高",
      "conclusion": "北方爆破科技有限公司在国家大学生就业服务平台和学校就业网出现工程爆破、采矿和安全方向岗位样本，业务与现场混装炸药、爆破工程相关。该条目适合补充北京工程爆破入口，但官网、签约主体、项目地点、薪资和作息仍需复查。",
      "keySignals": [
        "国家大学生就业服务平台出现相关岗位样本。",
        "学校就业网提供招聘公告和公司入口。",
        "岗位专业中出现弹药工程与爆炸技术等相关专业线索。",
        "业务方向偏工程爆破和现场混装炸药应用。"
      ],
      "suitableFor": [
        "关注工程爆破和采矿方向的学生",
        "关注兵器集团相关民爆业务的学生",
        "能接受项目地或现场技术工作的学生"
      ],
      "risks": [
        "缺少企业官网，主体信息需继续核对。",
        "招聘公告有时效性，岗位是否仍开放需复查。",
        "项目地可能不等于北京总部。",
        "薪资和作息不能直接写成稳定事实。"
      ],
      "sources": [
        {
          "title": "国家大学生就业服务平台：北方爆破科技有限公司岗位页",
          "type": "招聘公告",
          "date": "2025-09-02",
          "url": "https://www.ncss.cn/student/jobs/21dPqgiEjj9ajmSqcA8yzz/detail.html"
        },
        {
          "title": "独秀就业：北方爆破科技有限公司招聘公告",
          "type": "招聘公告",
          "date": "2025",
          "url": "https://www.dooynet.com/campus/view/id/585213"
        },
        {
          "title": "东北大学就业网：北方爆破科技有限公司招聘公告",
          "type": "学校就业网",
          "date": "待核对",
          "url": "http://job.neu.edu.cn/campus/view/id/561499"
        },
        {
          "title": "东北大学就业网：北方爆破科技有限公司公司页",
          "type": "学校就业网",
          "date": "待核对",
          "url": "http://job.neu.edu.cn/company/view/id/526389"
        },
        {
          "title": "北方爆破科技有限公司公开资料词条",
          "type": "其他",
          "date": "待核对",
          "url": "https://baike.baidu.com/item/%E5%8C%97%E6%96%B9%E7%88%86%E7%A0%B4%E7%A7%91%E6%8A%80%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8/19837294"
        }
      ]
    }
  },
  {
    "id": 40,
    "name": "招远民爆器材集团",
    "ownership": "民企",
    "city": "招远市",
    "region": "山东省",
    "salaryRange": "未知",
    "schedule": "待核对",
    "scaleOrIndustry": "民爆销售 / 爆破施工",
    "highlights": [
      "民营企业",
      "民爆销售",
      "爆破施工",
      "加入我们入口"
    ],
    "positions": "爆破工程、安全管理、仓储运输等方向待核对",
    "education": "待核对",
    "website": "https://www.zycsbp.com/",
    "links": [
      {
        "title": "招远民爆器材集团官网",
        "type": "官网",
        "url": "https://www.zycsbp.com/",
        "note": "企业官网入口。"
      },
      {
        "title": "招远民爆器材集团简介",
        "type": "官网",
        "url": "https://www.zycsbp.com/about.html",
        "note": "集团简介和业务入口，需按官网原文核对。"
      },
      {
        "title": "招远民爆器材集团民爆专卖入口",
        "type": "官网",
        "url": "https://www.zycsbp.com/subsidiaries.html",
        "note": "官网子公司和业务入口。"
      },
      {
        "title": "招远民爆器材集团加入我们",
        "type": "招聘入口",
        "url": "https://www.zycsbp.com/join.html",
        "note": "官网人才联系入口，具体岗位需复查。"
      },
      {
        "title": "招远民爆器材集团资质荣誉入口",
        "type": "官网",
        "url": "https://www.zycsbp.com/honor.html",
        "note": "官网 · 待核对"
      }
    ],
    "description": "民爆销售、运输和爆破施工相关企业。",
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "中",
      "updatedAt": "2026-06-08",
      "summary": "官网可支撑主体、业务方向和加入我们入口，具体招聘岗位、薪资、作息和签约主体仍需复查。",
      "verifiedFields": [
        "官网入口",
        "集团简介入口",
        "民爆销售和爆破施工方向",
        "加入我们入口"
      ],
      "pendingFields": [
        "具体法律主体",
        "最新招聘岗位",
        "学历要求",
        "薪资范围",
        "作息安排",
        "实际工作地点"
      ]
    },
    "research": {
      "updatedAt": "2026-06-08",
      "status": "官网入口较清楚，招聘细节不足。",
      "relevanceLevel": "中",
      "conclusion": "招远民爆器材集团官网显示其业务涉及民爆销售、仓储配送、运输和爆破施工，可作为山东区域民营民爆企业入口。该条目适合学生查企业入口和业务方向，具体法律主体、岗位、学历、薪资、作息和工作地点仍需按最新招聘信息复查。",
      "keySignals": [
        "官网提供集团公开入口。",
        "官网简介展示民爆相关业务线索。",
        "子公司入口涉及民爆专卖和业务分工。",
        "加入我们页面可作为人才联系入口。"
      ],
      "suitableFor": [
        "关注民营民爆企业的学生",
        "关注爆破施工和现场服务的学生",
        "关注山东区域就业入口的学生"
      ],
      "risks": [
        "加入我们页面不能代表当前有校招岗位。",
        "具体签约法律主体需复查。",
        "岗位可能涉及仓储、运输或施工现场。",
        "薪资、作息和学历要求没有稳定公开证据。"
      ],
      "sources": [
        {
          "title": "招远民爆器材集团官网",
          "type": "官网",
          "date": "待核对",
          "url": "https://www.zycsbp.com/"
        },
        {
          "title": "招远民爆器材集团简介",
          "type": "官网",
          "date": "待核对",
          "url": "https://www.zycsbp.com/about.html"
        },
        {
          "title": "招远民爆器材集团民爆专卖入口",
          "type": "官网",
          "date": "待核对",
          "url": "https://www.zycsbp.com/subsidiaries.html"
        },
        {
          "title": "招远民爆器材集团资质荣誉入口",
          "type": "官网",
          "date": "待核对",
          "url": "https://www.zycsbp.com/honor.html"
        },
        {
          "title": "招远民爆器材集团加入我们",
          "type": "招聘入口",
          "date": "待核对",
          "url": "https://www.zycsbp.com/join.html"
        }
      ]
    }
  },
    {
    "id": 41,
    "name": "黑龙江盛安民用爆破器材有限责任公司",
    "ownership": "待核对",
    "city": "双鸭山市",
    "region": "黑龙江省",
    "salaryRange": "未知",
    "schedule": "待核对",
    "scaleOrIndustry": "民爆器材 / 区域生产经营",
    "highlights": [
      "东北入口",
      "民爆器材",
      "政府报道线索",
      "政务报道线索"
    ],
    "positions": "生产技术、安全管理、设备维护等岗位待核对",
    "education": "待核对",
    "website": "",
    "links": [
      {
        "title": "双鸭山市政府调研报道",
        "type": "政府资料",
        "url": "http://www.shuangyashan.gov.cn/sys/d83a395e787241e0a02a9528a12ed5ea/202503/c07_225914.shtml",
        "note": "地方政府公开报道入口。"
      },
      {
        "title": "黑龙江日报相关报道",
        "type": "新闻资料",
        "url": "http://epaper.hljnews.cn/hljrb/pc/con/202207/26/content_97728.html",
        "note": "区域企业报道线索。"
      },
      {
        "title": "澎湃政务四方台区工业经济报道",
        "type": "新闻资料",
        "url": "https://www.thepaper.cn/newsDetail_forward_24163434",
        "note": "政务报道入口，可辅助核对企业主体和区域线索。"
      },
      {
        "title": "黑龙江省工业和信息化厅公开入口",
        "type": "政府资料",
        "url": "https://gxt.hlj.gov.cn/",
        "note": "用于后续跟踪民爆监管公开资料。"
      },
      {
        "title": "双鸭山市人民政府公开入口",
        "type": "政府资料",
        "url": "http://www.shuangyashan.gov.cn/",
        "note": "地方政府资料入口。"
      }
    ],
    "description": "黑龙江区域民爆器材生产经营相关企业。",
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "中",
      "updatedAt": "2026-06-08",
      "summary": "政府报道和政务报道可支撑主体与区域线索；官网、股权、最新岗位、薪资和作息仍需复查。",
      "verifiedFields": [
        "企业全称",
        "黑龙江双鸭山区域",
        "民爆器材相关业务线索",
        "政府公开报道入口",
        "政务报道入口线索"
      ],
      "pendingFields": [
        "企业官网",
        "企业性质和股权口径",
        "最新招聘岗位",
        "学历要求",
        "薪资范围",
        "作息安排"
      ]
    },
    "research": {
      "updatedAt": "2026-06-08",
      "status": "政府报道和政务报道可用，招聘细节不足。",
      "relevanceLevel": "中",
      "conclusion": "黑龙江盛安民用爆破器材有限责任公司可作为东北地区民爆器材企业入口。现有资料以地方政府报道、新闻资料和政务报道为主，能支撑主体和行业相关性，但不能判断稳定校招、薪资、作息和具体岗位。",
      "keySignals": [
        "地方政府报道中出现企业主体线索。",
        "公开报道可辅助确认黑龙江区域民爆相关性。",
        "政务报道可辅助确认区域工业企业线索。",
        "可补充东北地区民爆企业覆盖。"
      ],
      "suitableFor": [
        "关注东北地区民爆企业的学生。",
        "关注生产、安全和设备维护岗位线索的学生。",
        "愿意后续核对招聘公告的求职学生。"
      ],
      "risks": [
        "未找到稳定企业官网。",
        "未见稳定公开招聘入口，不能判断当前校招开放。",
        "薪资、作息和学历要求没有可靠公开口径。",
        "工作地点可能涉及厂区或分支机构。"
      ],
      "sources": [
        {
          "title": "双鸭山市政府调研报道",
          "type": "政府资料",
          "date": "2025-03",
          "url": "http://www.shuangyashan.gov.cn/sys/d83a395e787241e0a02a9528a12ed5ea/202503/c07_225914.shtml"
        },
        {
          "title": "黑龙江日报相关报道",
          "type": "新闻资料",
          "date": "2022-07-26",
          "url": "http://epaper.hljnews.cn/hljrb/pc/con/202207/26/content_97728.html"
        },
        {
          "title": "澎湃政务四方台区工业经济报道",
          "type": "新闻资料",
          "date": "2023-08-10",
          "url": "https://www.thepaper.cn/newsDetail_forward_24163434"
        },
        {
          "title": "黑龙江省工业和信息化厅公开入口",
          "type": "政府资料",
          "date": "待核对",
          "url": "https://gxt.hlj.gov.cn/"
        },
        {
          "title": "双鸭山市人民政府公开入口",
          "type": "政府资料",
          "date": "待核对",
          "url": "http://www.shuangyashan.gov.cn/"
        }
      ]
    }
  },
  {
    "id": 42,
    "name": "河北卫星化工股份有限公司",
    "ownership": "国企",
    "city": "新乐市",
    "region": "河北省",
    "salaryRange": "未知",
    "schedule": "待核对",
    "scaleOrIndustry": "民爆器材 / 雷管生产",
    "highlights": [
      "华北入口",
      "保利联合线索",
      "雷管生产",
      "民爆器材"
    ],
    "positions": "工艺技术、质量管理、安全管理、生产岗位待核对",
    "education": "待核对",
    "website": "",
    "links": [
      {
        "title": "保利联合所属企业页面",
        "type": "官网",
        "url": "https://www.poly-union.com/contents/189/338.html",
        "note": "上级集团官网所属企业入口。"
      },
      {
        "title": "保利联合化工控股集团官网",
        "type": "官网",
        "url": "https://www.poly-union.com/",
        "note": "上级集团官网入口。"
      },
      {
        "title": "保利联合公告入口",
        "type": "新闻资料",
        "url": "https://www.szse.cn/certificate/individual/index.html?code=002037",
        "note": "上市公司公告检索入口。"
      },
      {
        "title": "保利联合投资者关系入口",
        "type": "新闻资料",
        "url": "https://irm.cninfo.com.cn/",
        "note": "上市公司公开资料检索入口。"
      },
      {
        "title": "河北省工业和信息化厅公开入口",
        "type": "政府资料",
        "url": "https://gxt.hebei.gov.cn/",
        "note": "用于后续跟踪民爆行业监管资料。"
      }
    ],
    "description": "河北区域民爆器材和雷管生产相关企业。",
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "中",
      "updatedAt": "2026-06-08",
      "summary": "上级集团官网可支撑所属企业和民爆方向线索；独立官网、招聘岗位、薪资、作息和工作地点仍需复查。",
      "verifiedFields": [
        "企业全称",
        "保利联合所属企业线索",
        "河北区域入口",
        "民爆器材和雷管生产线索"
      ],
      "pendingFields": [
        "企业独立官网",
        "最新招聘公告",
        "岗位和学历要求",
        "薪资范围",
        "作息安排",
        "实际厂区地点"
      ]
    },
    "research": {
      "updatedAt": "2026-06-08",
      "status": "集团资料较稳，独立招聘信息不足。",
      "relevanceLevel": "中",
      "conclusion": "河北卫星化工股份有限公司可作为华北地区民爆器材和雷管生产企业入口。现有证据以上级集团官网、上市公司公开资料入口和监管资料入口为主，可支撑行业相关性；独立校招、薪资、作息和厂区岗位仍需复查。",
      "keySignals": [
        "保利联合所属企业页面提供主体线索。",
        "业务方向与民爆器材和雷管生产相关。",
        "可补充河北地区民爆企业覆盖。",
        "上市公司公告入口可继续核对股权和经营信息。"
      ],
      "suitableFor": [
        "关注华北民爆器材生产的学生。",
        "关注雷管、工艺和安全管理岗位线索的学生。",
        "希望了解央国企体系子公司入口的学生。"
      ],
      "risks": [
        "未找到稳定独立官网。",
        "公开招聘信息不足，不宜判断校招开放度。",
        "薪资、作息和学历要求保持未知。",
        "招聘和签约主体（待核对）。"
      ],
      "sources": [
        {
          "title": "保利联合所属企业页面",
          "type": "官网",
          "date": "2025-05-27",
          "url": "https://www.poly-union.com/contents/189/338.html"
        },
        {
          "title": "保利联合化工控股集团官网",
          "type": "官网",
          "date": "待核对",
          "url": "https://www.poly-union.com/"
        },
        {
          "title": "深圳证券交易所保利联合公告入口",
          "type": "新闻资料",
          "date": "待核对",
          "url": "https://www.szse.cn/certificate/individual/index.html?code=002037"
        },
        {
          "title": "巨潮资讯投资者关系公开入口",
          "type": "新闻资料",
          "date": "待核对",
          "url": "https://irm.cninfo.com.cn/"
        },
        {
          "title": "河北省工业和信息化厅公开入口",
          "type": "政府资料",
          "date": "待核对",
          "url": "https://gxt.hebei.gov.cn/"
        }
      ]
    }
  },
  {
    "id": 43,
    "name": "广东华威化工股份有限公司",
    "ownership": "待核对",
    "city": "兴宁市",
    "region": "广东省梅州市",
    "salaryRange": "未知",
    "schedule": "待核对",
    "scaleOrIndustry": "民爆产品 / 区域生产基地",
    "highlights": [
      "华南入口",
      "民爆产品",
      "广东区域",
      "集团子公司线索"
    ],
    "positions": "生产技术、安全管理、工艺质量等岗位待核对",
    "education": "待核对",
    "website": "",
    "links": [
      {
        "title": "广东税务企业相关报道",
        "type": "政府资料",
        "url": "https://guangdong.chinatax.gov.cn/gdsw/mzsw_jcdt/2026-01/12/content_f8517b56d864402ab4690d8135aea8d5.shtml",
        "note": "政府部门公开资料入口。"
      },
      {
        "title": "广东宏大控股集团官网",
        "type": "官网",
        "url": "https://www.gdhdkg.com/",
        "note": "上级集团公开入口，不能替代目标企业招聘公告。"
      },
      {
        "title": "广东宏大关于我们",
        "type": "官网",
        "url": "https://www.gdhdkg.com/show_list.php?id=1",
        "note": "集团业务和子公司线索入口。"
      },
      {
        "title": "广东宏大年度报告公告入口",
        "type": "新闻资料",
        "url": "https://www.szse.cn/certificate/individual/index.html?code=002683",
        "note": "上市公司公告检索入口。"
      },
      {
        "title": "智联招聘企业入口",
        "type": "招聘入口",
        "url": "https://www.zhaopin.com/companydetail/914454KW3WISII1MHQ.htm",
        "note": "招聘平台入口，仅作岗位检索线索。"
      }
    ],
    "description": "广东梅州区域民爆产品生产相关企业。",
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "中",
      "updatedAt": "2026-06-08",
      "summary": "政府资料、集团官网和公告入口可支撑区域和民爆业务线索；独立官网、最新岗位、薪资和作息仍需复查。",
      "verifiedFields": [
        "企业全称",
        "广东梅州区域",
        "民爆产品生产线索",
        "上级集团公开入口",
        "招聘平台入口线索"
      ],
      "pendingFields": [
        "企业独立官网",
        "企业性质和股权口径",
        "最新招聘岗位",
        "学历要求",
        "薪资范围",
        "作息安排"
      ]
    },
    "research": {
      "updatedAt": "2026-06-08",
      "status": "政府和集团资料可用，招聘细节不足。",
      "relevanceLevel": "中",
      "conclusion": "广东华威化工股份有限公司可作为广东梅州区域民爆产品生产入口。现有证据包括政府资料、上级集团入口、上市公司公告入口和招聘平台线索，可支撑行业相关性；独立官网、最新招聘、薪资和作息仍需复查。",
      "keySignals": [
        "政府部门公开资料提供主体和区域线索。",
        "上级集团入口可辅助核对民爆业务背景。",
        "上市公司公告入口可继续核对股权和经营信息。",
        "招聘平台只作为岗位检索线索。"
      ],
      "suitableFor": [
        "关注华南民爆生产企业的学生。",
        "关注生产技术、工艺质量和安全管理的学生。",
        "广东或梅州就业意向较强的学生。"
      ],
      "risks": [
        "未找到稳定独立官网。",
        "招聘平台不能代表当前校招开放。",
        "薪资、作息和学历要求没有可靠公开口径。",
        "与上级集团岗位不能混写，需要核对签约主体。"
      ],
      "sources": [
        {
          "title": "广东税务企业相关报道",
          "type": "政府资料",
          "date": "2026-01-12",
          "url": "https://guangdong.chinatax.gov.cn/gdsw/mzsw_jcdt/2026-01/12/content_f8517b56d864402ab4690d8135aea8d5.shtml"
        },
        {
          "title": "广东宏大控股集团官网",
          "type": "官网",
          "date": "待核对",
          "url": "https://www.gdhdkg.com/"
        },
        {
          "title": "广东宏大关于我们",
          "type": "官网",
          "date": "待核对",
          "url": "https://www.gdhdkg.com/show_list.php?id=1"
        },
        {
          "title": "深圳证券交易所广东宏大公告入口",
          "type": "新闻资料",
          "date": "待核对",
          "url": "https://www.szse.cn/certificate/individual/index.html?code=002683"
        },
        {
          "title": "智联招聘企业入口",
          "type": "招聘入口",
          "date": "待核对",
          "url": "https://www.zhaopin.com/companydetail/914454KW3WISII1MHQ.htm"
        }
      ]
    }
  },
  {
    "id": 44,
    "name": "福建高能建设工程有限公司",
    "ownership": "待核对",
    "city": "福州市",
    "region": "福建省",
    "salaryRange": "未知",
    "schedule": "待核对",
    "scaleOrIndustry": "爆破工程 / 工程施工",
    "highlights": [
      "专业爆破",
      "福建区域",
      "工程施工",
      "招聘入口线索"
    ],
    "positions": "爆破工程师、安全工程师、采矿工程师等岗位线索",
    "education": "待核对",
    "website": "http://www.fjgnbp.com",
    "links": [
      {
        "title": "福建高能建设工程有限公司官网",
        "type": "官网",
        "url": "http://www.fjgnbp.com"
      },
      {
        "title": "福建高能关于我们",
        "type": "官网",
        "url": "http://www.fjgnbp.com/gywm",
        "note": "企业简介和业务入口。"
      },
      {
        "title": "福建高能联系我们",
        "type": "官网",
        "url": "http://www.fjgnbp.com/lxwm",
        "note": "企业联系方式入口。"
      },
      {
        "title": "龙岩好工作人才网公司页",
        "type": "招聘入口",
        "url": "https://www.lyrc.cc/company_detail_27133.htm",
        "note": "地方招聘平台入口，岗位需复查。"
      },
      {
        "title": "福建省公安厅公开入口",
        "type": "政府资料",
        "url": "https://gat.fujian.gov.cn/",
        "note": "用于后续核对爆破作业单位相关公开信息。"
      }
    ],
    "description": "福建区域爆破与拆除工程相关企业。",
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "中",
      "updatedAt": "2026-06-08",
      "summary": "官网和招聘平台入口可支撑爆破工程相关性；资质细节、最新岗位、薪资、作息和项目地点仍需复查。",
      "verifiedFields": [
        "企业名称和官网入口",
        "福建区域入口",
        "爆破与拆除工程方向",
        "招聘平台岗位线索"
      ],
      "pendingFields": [
        "爆破作业资质最新状态",
        "最新招聘岗位",
        "学历和证书要求",
        "薪资范围",
        "作息安排",
        "项目工作地点"
      ]
    },
    "research": {
      "updatedAt": "2026-06-08",
      "status": "官网入口清楚，招聘和资质细节需复查。",
      "relevanceLevel": "中",
      "conclusion": "福建高能建设工程有限公司可作福建区域专业爆破工程入口。官网和地方招聘平台显示其方向偏爆破、拆除、矿山和现场工程服务；最新资质、岗位、薪资、作息和项目地点（待核对）。",
      "keySignals": [
        "官网提供企业公开入口。",
        "业务方向偏爆破与拆除工程。",
        "地方招聘平台出现爆破、安全和采矿岗位线索。",
        "可补充专业爆破服务类企业覆盖。"
      ],
      "suitableFor": [
        "关注爆破工程现场应用的学生。",
        "关注安全工程、采矿和施工技术岗位的学生。",
        "能接受项目现场和出差可能性的学生。"
      ],
      "risks": [
        "招聘信息来自地方平台，岗位有效性需核对。",
        "项目地点可能不同于总部城市。",
        "爆破岗位可能需要证书和现场经验。",
        "薪资和作息没有稳定公开口径。"
      ],
      "sources": [
        {
          "title": "福建高能建设工程有限公司官网",
          "type": "官网",
          "date": "待核对",
          "url": "http://www.fjgnbp.com"
        },
        {
          "title": "福建高能关于我们",
          "type": "官网",
          "date": "待核对",
          "url": "http://www.fjgnbp.com/gywm"
        },
        {
          "title": "福建高能联系我们",
          "type": "官网",
          "date": "待核对",
          "url": "http://www.fjgnbp.com/lxwm"
        },
        {
          "title": "龙岩好工作人才网公司页",
          "type": "招聘入口",
          "date": "待核对",
          "url": "https://www.lyrc.cc/company_detail_27133.htm"
        },
        {
          "title": "福建省公安厅公开入口",
          "type": "政府资料",
          "date": "待核对",
          "url": "https://gat.fujian.gov.cn/"
        }
      ]
    }
  },
    {
    "id": 45,
    "name": "北京中科力爆炸技术工程有限公司",
    "ownership": "待核对",
    "city": "北京市",
    "region": "北京市",
    "salaryRange": "未知",
    "schedule": "待核对",
    "scaleOrIndustry": "爆破工程 / 技术服务",
    "highlights": [
      "华北入口",
      "专业爆破",
      "技术服务",
      "工程应用"
    ],
    "positions": "爆破工程、工程管理、安全技术等岗位待核对",
    "education": "待核对",
    "website": "",
    "links": [
      {
        "title": "广东宏大集团新闻：中科力取得一级资质",
        "type": "新闻资料",
        "url": "https://www.gdhdkg.com/show.php?id=844",
        "note": "集团新闻直接出现中科力主体和爆破作业单位资质线索。"
      },
      {
        "title": "广东宏大控股集团官网",
        "type": "官网",
        "url": "https://www.gdhdkg.com/",
        "note": "用于核对上级集团或关联业务入口。"
      },
      {
        "title": "广东宏大 2025 年年度报告",
        "type": "新闻资料",
        "url": "https://money.finance.sina.com.cn/corp/view/vCB_AllBulletinDetail.php?id=12021783&stockid=002683",
        "note": "上市公司年报转载页，用于核对关联关系线索。"
      },
      {
        "title": "北京市住房城乡建设委公开入口",
        "type": "政府资料",
        "url": "https://zjw.beijing.gov.cn/",
        "note": "用于后续核对建设工程资质公开信息。"
      },
      {
        "title": "北京市公安局公开入口",
        "type": "政府资料",
        "url": "https://gaj.beijing.gov.cn/",
        "note": "用于后续核对爆破作业相关公开信息。"
      }
    ],
    "description": "北京区域爆破技术和工程服务相关企业。",
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "中",
      "updatedAt": "2026-06-08",
      "summary": "上级集团新闻和年报可支撑北京爆破技术服务线索；独立官网、最新岗位、薪资和作息仍需复查。",
      "verifiedFields": [
        "企业全称",
        "北京区域入口",
        "爆破技术和工程服务相关线索",
        "上级集团新闻和年报入口"
      ],
      "pendingFields": [
        "企业独立官网",
        "当前股权口径",
        "爆破作业资质最新状态",
        "最新招聘公告",
        "薪资范围",
        "作息安排"
      ]
    },
    "research": {
      "updatedAt": "2026-06-08",
      "status": "适合作为专业爆破服务入口，招聘资料不足。",
      "relevanceLevel": "中",
      "conclusion": "北京中科力爆炸技术工程有限公司可作为华北地区爆破技术和工程服务入口。现有资料更适合用于查主体、集团关联和技术服务方向，不能判断稳定招聘；岗位、资质、薪资、作息和项目地点需后续按公告复查。",
      "keySignals": [
        "企业名称与爆破技术工程方向直接相关。",
        "北京区域可补充华北专业爆破服务入口。",
        "上级集团新闻直接出现中科力主体和资质线索。",
        "上市公司年报可辅助核对关联关系。",
        "政府公开入口可用于后续核对资质信息。"
      ],
      "suitableFor": [
        "关注爆破工程技术服务的学生。",
        "关注北京或华北就业入口的学生。",
        "愿意后续核对项目地点和资质要求的学生。"
      ],
      "risks": [
        "未找到稳定独立官网和最新校招公告。",
        "公开入口不能直接支撑薪资和作息。",
        "项目制岗位可能涉及外派和现场工作。",
        "资质、股权和签约主体需按最新资料复查。"
      ],
      "sources": [
        {
          "title": "广东宏大集团新闻：中科力取得一级资质",
          "type": "新闻资料",
          "date": "待核对",
          "url": "https://www.gdhdkg.com/show.php?id=844"
        },
        {
          "title": "广东宏大控股集团官网",
          "type": "官网",
          "date": "待核对",
          "url": "https://www.gdhdkg.com/"
        },
        {
          "title": "广东宏大 2025 年年度报告",
          "type": "新闻资料",
          "date": "2026-03-17",
          "url": "https://money.finance.sina.com.cn/corp/view/vCB_AllBulletinDetail.php?id=12021783&stockid=002683"
        },
        {
          "title": "北京市住房城乡建设委公开入口",
          "type": "政府资料",
          "date": "待核对",
          "url": "https://zjw.beijing.gov.cn/"
        },
        {
          "title": "北京市公安局公开入口",
          "type": "政府资料",
          "date": "待核对",
          "url": "https://gaj.beijing.gov.cn/"
        }
      ]
    }
  },
  {
    "id": 46,
    "name": "北京理工北阳爆破工程技术有限责任公司",
    "ownership": "待核对",
    "city": "北京市",
    "region": "北京市",
    "salaryRange": "未知",
    "schedule": "待核对",
    "scaleOrIndustry": "爆破工程 / 工程施工",
    "highlights": [
      "华北入口",
      "专业爆破",
      "工程施工",
      "招聘入口线索"
    ],
    "positions": "爆破工程、工程管理、安全技术等岗位待核对",
    "education": "待核对",
    "website": "",
    "links": [
      {
        "title": "智联招聘公司页",
        "type": "招聘入口",
        "url": "https://www.zhaopin.com/companydetail/CZ135125240.htm",
        "note": "招聘平台入口，岗位有效性需复查。"
      },
      {
        "title": "北京工程爆破协会公司简介",
        "type": "其他",
        "url": "http://www.bjbpxh.cn/news.htm?newsId=2762&typeId=62",
        "note": "协会资料入口，用于核对业务和资质线索。"
      },
      {
        "title": "北京市规划自然资源委资质公示",
        "type": "政府资料",
        "url": "http://ghzrzyw.beijing.gov.cn/ziranziyuanguanli/dzzhzz/202212/t20221221_2882156.html",
        "note": "政府公示入口。"
      },
      {
        "title": "北京理工大学爆炸科学与安全防护实验室资料",
        "type": "新闻资料",
        "url": "https://est.bit.edu.cn/ttxw/b80194.htm",
        "note": "历史工程案例线索。"
      },
      {
        "title": "北京市住房城乡建设委公开入口",
        "type": "政府资料",
        "url": "https://zjw.beijing.gov.cn/",
        "note": "用于后续核对工程资质资料。"
      }
    ],
    "description": "北京区域专业爆破工程服务企业。",
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "中",
      "updatedAt": "2026-06-08",
      "summary": "协会资料、政府公示和招聘入口可支撑主体与爆破工程线索；最新岗位、薪资、作息、资质状态和项目地点仍需复查。",
      "verifiedFields": [
        "企业全称",
        "北京区域入口",
        "爆破工程施工方向",
        "协会资料入口",
        "招聘平台入口线索"
      ],
      "pendingFields": [
        "企业官网",
        "最新招聘岗位",
        "爆破作业资质最新状态",
        "薪资范围",
        "作息安排",
        "项目工作地点"
      ]
    },
    "research": {
      "updatedAt": "2026-06-08",
      "status": "专业爆破服务相关性较清楚，招聘细节不足。",
      "relevanceLevel": "中",
      "conclusion": "北京理工北阳爆破工程技术有限责任公司可作为华北专业爆破工程入口。现有资料来自协会页面、政府公示、历史工程案例和招聘平台，能说明业务方向；最新岗位、资质、薪资、作息和项目地点仍需复查。",
      "keySignals": [
        "协会资料中出现企业简介和工程爆破线索。",
        "政府公示可辅助核对资质相关信息。",
        "招聘平台提供企业入口，但岗位有效性需复查。",
        "历史资料显示其承接过爆破拆除工程。"
      ],
      "suitableFor": [
        "关注北京或华北爆破工程入口的学生。",
        "关注现场爆破、安全技术和工程管理的学生。",
        "能接受项目制和外派可能性的学生。"
      ],
      "risks": [
        "未找到稳定企业官网。",
        "招聘平台不能代表当前校招开放。",
        "项目地点可能不同于北京注册地。",
        "薪资、作息和证书要求没有稳定公开口径。"
      ],
      "sources": [
        {
          "title": "智联招聘公司页",
          "type": "招聘入口",
          "date": "待核对",
          "url": "https://www.zhaopin.com/companydetail/CZ135125240.htm"
        },
        {
          "title": "北京工程爆破协会公司简介",
          "type": "其他",
          "date": "待核对",
          "url": "http://www.bjbpxh.cn/news.htm?newsId=2762&typeId=62"
        },
        {
          "title": "北京市规划自然资源委资质公示",
          "type": "政府资料",
          "date": "2022-12",
          "url": "http://ghzrzyw.beijing.gov.cn/ziranziyuanguanli/dzzhzz/202212/t20221221_2882156.html"
        },
        {
          "title": "北京理工大学爆炸科学与安全防护实验室资料",
          "type": "新闻资料",
          "date": "2009-12",
          "url": "https://est.bit.edu.cn/ttxw/b80194.htm"
        },
        {
          "title": "北京市住房城乡建设委公开入口",
          "type": "政府资料",
          "date": "待核对",
          "url": "https://zjw.beijing.gov.cn/"
        }
      ]
    }
  },
    {
    "id": 47,
    "name": "云南达力爆破工程有限责任公司",
    "ownership": "国企",
    "city": "曲靖市",
    "region": "云南省",
    "salaryRange": "未知",
    "schedule": "待核对",
    "scaleOrIndustry": "爆破工程 / 现场混装服务",
    "highlights": [
      "西南入口",
      "专业爆破",
      "公开招聘",
      "现场混装线索"
    ],
    "positions": "技术员、爆破员、安全员、机电技术等岗位样本",
    "education": "待核对",
    "website": "",
    "links": [
      {
        "title": "云南达力爆破招聘公告",
        "type": "招聘公告",
        "url": "https://www.5rc.com/zhaokao/599886/",
        "note": "2026 年公开招聘线索。"
      },
      {
        "title": "国聘公司页",
        "type": "招聘入口",
        "url": "https://www.iguopin.com/company?id=118008880138551421",
        "note": "招聘平台入口。"
      },
      {
        "title": "云南公安爆破作业单位许可表",
        "type": "政府资料",
        "url": "https://gonganting.yn.gov.cn/upload/20210823/2021082309404699.xls",
        "note": "许可证历史资料，需复查最新状态。"
      },
      {
        "title": "新华网：多座混装地面站重启 达力爆破发展动力强劲",
        "type": "新闻资料",
        "url": "http://www.yn.xinhuanet.com/20250526/c4866f125d9e4903a44aa109223c2256/c.html",
        "note": "公开报道直接提到达力爆破、戎合控股、民爆和现场混装业务线索。"
      },
      {
        "title": "云南省人民政府国资委入口",
        "type": "政府资料",
        "url": "https://gzw.yn.gov.cn/",
        "note": "用于后续核对国资和集团资料。"
      }
    ],
    "description": "云南爆破工程和现场混装服务企业。",
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "高",
      "updatedAt": "2026-06-08",
      "summary": "招聘公告、国聘入口和政府许可资料可支撑专业爆破与招聘线索；官网、薪资、作息、证书要求和项目地点仍需复查。",
      "verifiedFields": [
        "企业全称",
        "云南曲靖区域",
        "爆破工程和现场服务方向",
        "公开招聘入口",
        "政府许可历史资料"
      ],
      "pendingFields": [
        "企业官网",
        "最新岗位有效期",
        "薪资范围",
        "作息安排",
        "证书和学历要求",
        "项目工作地点"
      ]
    },
    "research": {
      "updatedAt": "2026-06-08",
      "status": "公开招聘和许可资料较清楚，待遇细节仍需核对。",
      "relevanceLevel": "高",
      "conclusion": "云南达力爆破工程有限责任公司可作为西南专业爆破工程入口。公开招聘、国聘入口和政府许可资料显示其与爆破作业、现场服务和安全岗位相关；具体薪资、作息、证书要求、岗位有效期和项目地点仍需复查。",
      "keySignals": [
        "2026 年公开招聘出现技术员、安全员等岗位线索。",
        "国聘页面提供企业招聘入口。",
        "政府许可表可辅助核对爆破作业资质历史信息。",
        "新华网报道可辅助核对达力爆破、戎合控股和现场混装线索。",
        "云南区域补充专业爆破服务覆盖。"
      ],
      "suitableFor": [
        "关注西南爆破工程和现场服务的学生。",
        "关注安全员、爆破员和技术员岗位的学生。",
        "能接受项目现场和证书要求的学生。"
      ],
      "risks": [
        "官网入口连通性需复查。",
        "招聘公告有时效性，岗位可能调整或取消。",
        "项目地点可能分散在不同分公司或工地。",
        "薪资和作息未形成稳定公开口径。"
      ],
      "sources": [
        {
          "title": "云南达力爆破工程有限责任公司招聘公告",
          "type": "招聘公告",
          "date": "2026-02-10",
          "url": "https://www.5rc.com/zhaokao/599886/"
        },
        {
          "title": "国聘云南达力爆破工程有限责任公司页",
          "type": "招聘入口",
          "date": "待核对",
          "url": "https://www.iguopin.com/company?id=118008880138551421"
        },
        {
          "title": "云南公安爆破作业单位许可证信息表",
          "type": "政府资料",
          "date": "2021-08",
          "url": "https://gonganting.yn.gov.cn/upload/20210823/2021082309404699.xls"
        },
        {
          "title": "新华网：多座混装地面站重启 达力爆破发展动力强劲",
          "type": "新闻资料",
          "date": "2025-05-26",
          "url": "http://www.yn.xinhuanet.com/20250526/c4866f125d9e4903a44aa109223c2256/c.html"
        },
        {
          "title": "云南省人民政府国资委入口",
          "type": "政府资料",
          "date": "待核对",
          "url": "https://gzw.yn.gov.cn/"
        }
      ]
    }
  },
  {
    "id": 48,
    "name": "重庆顺安爆破器材有限公司",
    "ownership": "待核对",
    "city": "重庆市",
    "region": "重庆市",
    "salaryRange": "未知",
    "schedule": "待核对",
    "scaleOrIndustry": "民爆器材 / 爆破服务",
    "highlights": [
      "西南入口",
      "民爆器材",
      "政府许可资料",
      "招聘入口线索"
    ],
    "positions": "生产技术、安全管理、爆破服务等岗位待核对",
    "education": "待核对",
    "website": "",
    "links": [
      {
        "title": "重庆经信委民爆许可公告",
        "type": "政府资料",
        "url": "https://jjxxw.cq.gov.cn/zwgk_213/gsgg/202303/t20230325_11811050.html",
        "note": "政府许可资料入口。"
      },
      {
        "title": "新华英才公司页",
        "type": "招聘入口",
        "url": "https://www.chinahr.com/company/homepage/64a62d70e4b0a8d69241d386",
        "note": "招聘平台入口，岗位需复查。"
      },
      {
        "title": "重庆市经济信息委公开入口",
        "type": "政府资料",
        "url": "https://jjxxw.cq.gov.cn/",
        "note": "用于后续跟踪民爆监管资料。"
      },
      {
        "title": "重庆市应急管理局公开入口",
        "type": "政府资料",
        "url": "https://yjj.cq.gov.cn/",
        "note": "用于后续核对安全监管资料。"
      },
      {
        "title": "重庆顺安相关环保资料",
        "type": "政府资料",
        "url": "https://ws.cq.gov.cn/bm/hbj/202005/P020200506375424690075.pdf",
        "note": "下属或关联生产点资料线索，需按原文复查主体。"
      }
    ],
    "description": "重庆民爆器材生产和爆破服务企业。",
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "中",
      "updatedAt": "2026-06-08",
      "summary": "政府许可资料和招聘入口可支撑民爆方向线索；官网、股权、最新岗位、薪资、作息和生产点仍需复查。",
      "verifiedFields": [
        "企业全称",
        "重庆区域入口",
        "民爆许可资料线索",
        "招聘平台入口线索",
        "生产点资料线索"
      ],
      "pendingFields": [
        "稳定官网入口",
        "当前股权口径",
        "最新招聘岗位",
        "薪资范围",
        "作息安排",
        "具体生产点和工作地点"
      ]
    },
    "research": {
      "updatedAt": "2026-06-08",
      "status": "政府许可资料可用，官网和招聘细节需复查。",
      "relevanceLevel": "中",
      "conclusion": "重庆顺安爆破器材有限公司可作为重庆民爆器材和爆破服务入口。政府许可资料、应急监管入口和招聘平台可支撑行业相关性；官网连通性、股权口径、岗位、薪资、作息、生产点和签约主体仍需后续复查。",
      "keySignals": [
        "重庆经信委公告提供民爆许可资料线索。",
        "招聘平台可作为岗位检索入口。",
        "重庆应急和经信公开入口可继续核对监管资料。",
        "相关资料显示可能涉及生产点或下属主体。"
      ],
      "suitableFor": [
        "关注重庆民爆器材企业的学生。",
        "关注生产技术、安全管理和爆破服务的学生。",
        "愿意核对生产点和签约主体的求职学生。"
      ],
      "risks": [
        "官网入口连通性不稳定。",
        "招聘入口不能代表当前校招开放。",
        "生产点和工作地点需按岗位确认。",
        "薪资、作息和股权口径没有稳定公开证据。"
      ],
      "sources": [
        {
          "title": "重庆经信委民爆许可公告",
          "type": "政府资料",
          "date": "2023-03-25",
          "url": "https://jjxxw.cq.gov.cn/zwgk_213/gsgg/202303/t20230325_11811050.html"
        },
        {
          "title": "新华英才重庆顺安公司页",
          "type": "招聘入口",
          "date": "待核对",
          "url": "https://www.chinahr.com/company/homepage/64a62d70e4b0a8d69241d386"
        },
        {
          "title": "重庆市经济信息委公开入口",
          "type": "政府资料",
          "date": "待核对",
          "url": "https://jjxxw.cq.gov.cn/"
        },
        {
          "title": "重庆市应急管理局公开入口",
          "type": "政府资料",
          "date": "待核对",
          "url": "https://yjj.cq.gov.cn/"
        },
        {
          "title": "重庆顺安相关环保资料",
          "type": "政府资料",
          "date": "2020-05",
          "url": "https://ws.cq.gov.cn/bm/hbj/202005/P020200506375424690075.pdf"
        }
      ]
    }
  },
  {
    "id": 49,
    "name": "中钢集团马鞍山矿山研究总院股份有限公司",
    "ownership": "国企",
    "city": "马鞍山市",
    "region": "安徽省",
    "salaryRange": "未知",
    "schedule": "待核对",
    "scaleOrIndustry": "矿山安全 / 爆破与检测",
    "highlights": [
      "安全技术",
      "检测评价",
      "爆破工程线索",
      "招聘宣讲"
    ],
    "positions": "矿山安全、检测评价、爆破工程、项目管理等岗位线索",
    "education": "硕士岗位样本较多，具体待核对",
    "website": "https://www.mimr.cn/",
    "links": [
      {
        "title": "中钢矿院官网",
        "type": "官网",
        "url": "https://www.mimr.cn/",
        "note": "企业官网入口。"
      },
      {
        "title": "学校就业网招聘宣讲",
        "type": "学校就业网",
        "url": "https://www.hnvtc.edu.cn/info/1453/28493.htm",
        "note": "2026 年来校交流及招聘宣讲线索。"
      },
      {
        "title": "中钢集团官网",
        "type": "官网",
        "url": "https://www.sinosteel.com/",
        "note": "上级集团入口。"
      },
      {
        "title": "中钢矿院检验检测资料线索",
        "type": "新闻资料",
        "url": "https://qxb-pdf-osscache.qixin.com/AnBaseinfo/cd65fa1ba1b55c4201b238303f98cffb.pdf",
        "note": "公开 PDF 资料线索，具体资质需按原文复查。"
      },
      {
        "title": "国家矿山安全监察局公开入口",
        "type": "政府资料",
        "url": "https://www.chinamine-safety.gov.cn/",
        "note": "用于后续核对矿山安全与检测相关资料。"
      }
    ],
    "description": "矿山安全、爆破和检测技术服务机构。",
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "中",
      "updatedAt": "2026-06-08",
      "summary": "官网、学校就业网和公开资料可支撑矿山安全、检测评价和爆破工程线索；岗位细则、薪资、作息和项目地点仍需复查。",
      "verifiedFields": [
        "企业全称和官网入口",
        "国企背景线索",
        "矿山安全和检测评价方向",
        "爆破工程相关线索",
        "招聘宣讲入口"
      ],
      "pendingFields": [
        "最新招聘岗位和数量",
        "具体学历要求",
        "薪资范围",
        "作息安排",
        "项目地点和出差要求"
      ]
    },
    "research": {
      "updatedAt": "2026-06-08",
      "status": "官网和招聘宣讲线索可用，岗位待遇需复查。",
      "relevanceLevel": "中",
      "conclusion": "中钢集团马鞍山矿山研究总院可作为矿山安全、检测评价和爆破工程技术入口。官网、集团入口和学校就业网资料可支撑方向判断；岗位、学历、薪资、作息、项目地点和出差要求（待核对）。",
      "keySignals": [
        "企业官网可作为主体和业务核对入口。",
        "学校就业网出现 2026 年招聘宣讲线索。",
        "公开资料出现检测评价和矿山安全技术线索。",
        "业务与爆破工程、安全技术方向存在交集。"
      ],
      "suitableFor": [
        "关注安全技术和检测评价方向的学生。",
        "关注矿山爆破、岩土和项目管理的学生。",
        "硕士阶段想找技术服务或研究岗位的学生。"
      ],
      "risks": [
        "岗位可能偏矿山安全，不一定直接对应弹药生产。",
        "招聘岗位和学历要求（待核对）。",
        "部分项目可能涉及现场试验或出差。",
        "薪资和作息没有稳定公开口径。"
      ],
      "sources": [
        {
          "title": "中钢集团马鞍山矿山研究总院股份有限公司官网",
          "type": "官网",
          "date": "待核对",
          "url": "https://www.mimr.cn/"
        },
        {
          "title": "学校就业网：中钢矿院来校交流及招聘宣讲",
          "type": "学校就业网",
          "date": "2026-05-29",
          "url": "https://www.hnvtc.edu.cn/info/1453/28493.htm"
        },
        {
          "title": "中钢集团官网",
          "type": "官网",
          "date": "待核对",
          "url": "https://www.sinosteel.com/"
        },
        {
          "title": "中钢矿院检验检测资料线索",
          "type": "新闻资料",
          "date": "待核对",
          "url": "https://qxb-pdf-osscache.qixin.com/AnBaseinfo/cd65fa1ba1b55c4201b238303f98cffb.pdf"
        },
        {
          "title": "国家矿山安全监察局公开入口",
          "type": "政府资料",
          "date": "待核对",
          "url": "https://www.chinamine-safety.gov.cn/"
        }
      ]
    }
  },
    {
    "id": 50,
    "name": "中煤科工集团重庆研究院有限公司",
    "ownership": "国企",
    "city": "重庆市",
    "region": "重庆市",
    "salaryRange": "未知",
    "schedule": "待核对",
    "scaleOrIndustry": "煤矿安全 / 民爆与评价",
    "highlights": [
      "安全技术",
      "民爆技术线索",
      "安全评价",
      "招聘入口"
    ],
    "positions": "安全技术、工业安全、民爆技术、新材料等岗位待核对",
    "education": "待核对",
    "website": "",
    "links": [
      {
        "title": "智联招聘公司页",
        "type": "招聘入口",
        "url": "https://www.zhaopin.com/companydetail/jobs-CZ255849730/",
        "note": "招聘平台公司页，岗位和开放状态以页面实时信息为准。"
      },
      {
        "title": "国聘公司页",
        "type": "招聘入口",
        "url": "https://www.iguopin.com/company?id=10685285141834115",
        "note": "招聘平台入口。"
      },
      {
        "title": "猎聘公司页",
        "type": "招聘入口",
        "url": "https://m.liepin.com/company/7959481/",
        "note": "招聘平台入口，作为岗位线索补充。"
      },
      {
        "title": "重庆应急管理局安全评价资质公告",
        "type": "政府资料",
        "url": "https://yjj.cq.gov.cn/zwgk_230/tzgg/202503/t20250303_14363090.html",
        "note": "安全评价机构资质延续公告。"
      },
      {
        "title": "国家矿山安全监察局公开入口",
        "type": "政府资料",
        "url": "https://www.chinamine-safety.gov.cn/",
        "note": "用于后续核对矿山安全监管公开资料。"
      }
    ],
    "description": "煤矿安全、民爆技术和评价服务机构。",
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "中",
      "updatedAt": "2026-06-08",
      "summary": "智联、国聘、猎聘入口和政府安全评价资料可支撑安全技术与民爆线索；官网、岗位细则、薪资、作息和签约主体仍需复查。",
      "verifiedFields": [
        "企业全称",
        "重庆区域入口",
        "煤矿安全和工业安全方向",
        "民爆技术线索",
        "安全评价资质资料",
        "招聘入口"
      ],
      "pendingFields": [
        "稳定官网入口",
        "最新招聘岗位",
        "签约主体和工作地点",
        "薪资范围",
        "作息安排",
        "现场测试或出差要求"
      ]
    },
    "research": {
      "updatedAt": "2026-06-08",
      "status": "招聘平台和安全评价资料可用，官网和岗位细节需复查。",
      "relevanceLevel": "中",
      "conclusion": "中煤科工集团重庆研究院有限公司可作为煤矿安全、工业安全、民爆技术和安全评价方向入口。智联、国聘、猎聘和政府资料能支撑相关性；官网连通性、最新岗位、薪资、作息、签约主体和现场工作要求仍需复查。",
      "keySignals": [
        "智联、国聘和猎聘页面提供招聘入口。",
        "重庆应急管理局公告涉及安全评价资质。",
        "业务围绕煤矿安全、工业安全和爆破技术研究。"
      ],
      "suitableFor": [
        "关注安全技术、检测评价和民爆技术的学生。",
        "想看央企科研院所型就业入口的学生。",
        "能接受现场测试或工程服务可能性的学生。"
      ],
      "risks": [
        "官网入口连通性需复查。",
        "民爆技术只是业务线索，需按具体部门判断匹配度。",
        "岗位可能分布在分院或项目现场。",
        "薪资、作息和出差要求没有稳定公开口径。"
      ],
      "sources": [
        {
          "title": "智联招聘：中煤科工集团重庆研究院有限公司招聘信息",
          "type": "招聘入口",
          "date": "待核对",
          "url": "https://www.zhaopin.com/companydetail/jobs-CZ255849730/"
        },
        {
          "title": "国聘中煤科工集团重庆研究院有限公司页",
          "type": "招聘入口",
          "date": "待核对",
          "url": "https://www.iguopin.com/company?id=10685285141834115"
        },
        {
          "title": "猎聘：中煤科工集团重庆研究院有限公司公司页",
          "type": "招聘入口",
          "date": "待核对",
          "url": "https://m.liepin.com/company/7959481/"
        },
        {
          "title": "重庆市应急管理局安全评价资质延续公告",
          "type": "政府资料",
          "date": "2025-03-03",
          "url": "https://yjj.cq.gov.cn/zwgk_230/tzgg/202503/t20250303_14363090.html"
        },
        {
          "title": "国家矿山安全监察局公开入口",
          "type": "政府资料",
          "date": "待核对",
          "url": "https://www.chinamine-safety.gov.cn/"
        }
      ]
    }
  },
  {
    "id": 51,
    "name": "华荣科技股份有限公司",
    "ownership": "民企",
    "city": "上海市",
    "region": "上海市",
    "salaryRange": "未知",
    "schedule": "待核对",
    "scaleOrIndustry": "防爆电气 / 危险场景安全",
    "highlights": [
      "防爆电气",
      "防爆灯具",
      "防爆机器人"
    ],
    "positions": "电气工程师、机械结构设计、防爆技术研发等岗位",
    "education": "本科及以上",
    "website": "https://ex.warom.com/",
    "links": [
      {
        "title": "华荣科技股份有限公司官网",
        "type": "官网",
        "url": "https://ex.warom.com/",
        "note": "企业官方主入口，展示防爆电器与照明等产品。"
      },
      {
        "title": "河北工业大学就业指导中心招聘页",
        "type": "学校就业网",
        "url": "https://career.hebut.edu.cn/company/index/id/17428.html",
        "note": "用于核对历史校招简章及专业岗位需求。"
      }
    ],
    "description": "防爆电气和危险场景安全装备企业。",
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "高",
      "updatedAt": "2026-07-06",
      "summary": "已核对独立官网与公开业务方向；招聘平台及招聘公告入口待进一步验证。",
      "verifiedFields": [
        "企业全称",
        "企业性质",
        "业务与产品方向",
        "主要入口链接"
      ],
      "pendingFields": [
        "最新公开校招简章",
        "最新薪资待遇反馈",
        "真实作息制度",
        "具体工作地点分布"
      ]
    },
    "research": {
      "updatedAt": "2026-07-06",
      "status": "适合作为防爆与爆炸防护配套链企业候选。",
      "relevanceLevel": "高",
      "conclusion": "华荣科技主营防爆电气、防爆灯具、防爆机器人等产品，方向匹配弹药与爆炸技术的防爆管理及配套。具体岗位、作息和待遇（待核对），尚无官方招聘直接佐证，产品线决定岗位边界。",
      "keySignals": [
        "拥有稳定的独立官方网站。",
        "主营产品在防爆电器、静电防爆或爆炸防护链条中方向直接。",
        "适合作为安全、防爆检测技术等方向交叉背景参考。"
      ],
      "suitableFor": [
        "关注防爆电器、工业爆炸防护装备及配套的学生。",
        "希望寻找长三角或华东区域防爆制造板块的学生。"
      ],
      "risks": [
        "当前无公开可考证的薪资与作息数据。",
        "具体生产及研发岗位的学历门槛可能发生变化。",
        "独立校招公告需按学校就业网最新批次更新。"
      ],
      "sources": [
        {
          "title": "华荣科技股份有限公司官网",
          "type": "官网",
          "date": "2026-06-10访问",
          "url": "https://ex.warom.com/"
        },
        {
          "title": "河北工业大学就业指导中心招聘页",
          "type": "学校就业网",
          "date": "待核对",
          "url": "https://career.hebut.edu.cn/company/index/id/17428.html"
        },
        {
          "title": "关于华荣 - 华荣科技股份有限公司",
          "type": "官网",
          "date": "2026-07-06访问",
          "url": "https://ex.warom.com/about/index.aspx"
        },
        {
          "title": "华荣喜获首批防爆电气强制性产品认证证书",
          "type": "新闻资料",
          "date": "2019-10-22",
          "url": "https://ex.warom.com/news/index-detail.aspx?Id=48b83d2d-1cd4-4698-8b04-45f78a404adf"
        },
        {
          "title": "电气工程师 - 华荣科技股份有限公司",
          "type": "学校就业网",
          "date": "2024-11-14",
          "url": "https://career.hebut.edu.cn/home/correcruit/content/id/69072.html"
        },
        {
          "title": "华荣科技股份有限公司技术服务工程师",
          "type": "学校就业网",
          "date": "2024",
          "url": "https://career.hit.edu.cn/zhxy-xszyfzpt/zpxx/zpxxxq?id=YjMwZTVhOWQxOTdmNGY3OTkwZmQ0MDlkMDA2MzU5Yjg%3D"
        }
      ]
    }
  },
  {
    "id": 52,
    "name": "新黎明科技股份有限公司",
    "ownership": "民企",
    "city": "苏州市",
    "region": "江苏省",
    "salaryRange": "未知",
    "schedule": "待核对",
    "scaleOrIndustry": "防爆电器 / 智能防爆设备",
    "highlights": [
      "防爆电器",
      "防爆管件",
      "智能防爆"
    ],
    "positions": "防爆技术研发、生产工艺、质量控制岗位待核对",
    "education": "待核对",
    "website": "https://www.sunleem.com/",
    "links": [
      {
        "title": "新黎明科技股份有限公司官网",
        "type": "官网",
        "url": "https://www.sunleem.com/",
        "note": "企业官方主页，展示智能防爆设备等。"
      }
    ],
    "description": "高等级防爆电气产品服务商。",
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "高",
      "updatedAt": "2026-07-06",
      "summary": "已核对独立官网与公开业务方向；招聘平台及招聘公告入口待进一步验证。",
      "verifiedFields": [
        "企业全称",
        "企业性质",
        "业务与产品方向",
        "主要入口链接"
      ],
      "pendingFields": [
        "最新公开校招简章",
        "最新薪资待遇反馈",
        "真实作息制度",
        "具体工作地点分布"
      ]
    },
    "research": {
      "updatedAt": "2026-07-06",
      "status": "适合作为防爆与爆炸防护配套链企业候选。",
      "relevanceLevel": "高",
      "conclusion": "新黎明科技主营防爆电器、防爆管件、智能防爆等产品，方向匹配弹药与爆炸技术的防爆管理及配套。具体岗位、作息和待遇（待核对），尚无官方招聘直接佐证，岗位以产品和技术线划分。",
      "keySignals": [
        "拥有稳定的独立官方网站。",
        "主营产品在防爆电器、静电防爆或爆炸防护链条中方向直接。",
        "适合作为安全、防爆检测技术等方向交叉背景参考。"
      ],
      "suitableFor": [
        "关注防爆电器、工业爆炸防护装备及配套的学生。",
        "希望寻找长三角或华东区域防爆制造板块的学生。"
      ],
      "risks": [
        "当前无公开可考证的薪资与作息数据。",
        "具体生产及研发岗位的学历门槛可能发生变化。",
        "独立校招公告需按学校就业网最新批次更新。"
      ],
      "sources": [
        {
          "title": "新黎明科技股份有限公司官网",
          "type": "官网",
          "date": "2026-06-10访问",
          "url": "https://www.sunleem.com/"
        },
        {
          "title": "公司简介 - 新黎明科技股份有限公司",
          "type": "官网",
          "date": "2026-07-06访问",
          "url": "https://www.sunleem.com/gsjj"
        },
        {
          "title": "产品中心 - 新黎明科技股份有限公司",
          "type": "官网",
          "date": "2026-07-06访问",
          "url": "https://www.sunleem.com/cpzs"
        },
        {
          "title": "防爆电器类 - 新黎明科技股份有限公司",
          "type": "官网",
          "date": "2026-07-06访问",
          "url": "https://www.sunleem.com/cpzs?product_category=2"
        },
        {
          "title": "招贤纳士 - 新黎明科技股份有限公司",
          "type": "招聘入口",
          "date": "2026-07-06访问",
          "url": "https://www.sunleem.com/jrwm"
        },
        {
          "title": "研发工程师 · 研发部",
          "type": "招聘公告",
          "date": "2021-05-08",
          "url": "https://www.sunleem.com/page174?article_id=16"
        }
      ]
    }
  },
  {
    "id": 53,
    "name": "飞策防爆电器股份有限公司",
    "ownership": "民企",
    "city": "嘉兴市",
    "region": "浙江省",
    "salaryRange": "未知",
    "schedule": "待核对",
    "scaleOrIndustry": "防爆灯具 / 矿用防爆电气",
    "highlights": [
      "防爆灯具",
      "防爆电器",
      "矿用防爆"
    ],
    "positions": "灯具研发、机械设计、销售支持等岗位待核对",
    "education": "待核对",
    "website": "https://www.feice.com/",
    "links": [
      {
        "title": "飞策防爆电器股份有限公司官网",
        "type": "官网",
        "url": "https://www.feice.com/",
        "note": "展示防爆灯具及矿用防爆电气设备。"
      },
      {
        "title": "官网招聘信息页",
        "type": "招聘入口",
        "url": "https://www.feice.com/recruit/recruitment-information",
        "note": "企业官方招聘岗位及联系方式入口。"
      }
    ],
    "description": "嘉兴防爆电器和防爆灯具企业。",
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "高",
      "updatedAt": "2026-07-06",
      "summary": "已核对独立官网与公开业务方向；招聘平台及招聘公告入口待进一步验证。",
      "verifiedFields": [
        "企业全称",
        "企业性质",
        "业务与产品方向",
        "主要入口链接"
      ],
      "pendingFields": [
        "最新公开校招简章",
        "最新薪资待遇反馈",
        "真实作息制度",
        "具体工作地点分布"
      ]
    },
    "research": {
      "updatedAt": "2026-07-06",
      "status": "适合作为防爆与爆炸防护配套链企业候选。",
      "relevanceLevel": "高",
      "conclusion": "飞策防爆主营防爆灯具、防爆电器、矿用防爆等产品，方向匹配弹药与爆炸技术的防爆管理及配套。具体岗位、作息和待遇（待核对），尚无官方招聘直接佐证，岗位以产品线划分。",
      "keySignals": [
        "拥有稳定的独立官方网站。",
        "主营产品在防爆电器、静电防爆或爆炸防护链条中方向直接。",
        "适合作为安全、防爆检测技术等方向交叉背景参考。"
      ],
      "suitableFor": [
        "关注防爆电器、工业爆炸防护装备及配套的学生。",
        "希望寻找长三角或华东区域防爆制造板块的学生。"
      ],
      "risks": [
        "当前无公开可考证的薪资与作息数据。",
        "具体生产及研发岗位的学历门槛可能发生变化。",
        "独立校招公告需按学校就业网最新批次更新。"
      ],
      "sources": [
        {
          "title": "飞策防爆电器股份有限公司官网",
          "type": "官网",
          "date": "2026-06-10访问",
          "url": "https://www.feice.com/"
        },
        {
          "title": "官网招聘信息页",
          "type": "招聘入口",
          "date": "2026-06-10访问",
          "url": "https://www.feice.com/recruit/recruitment-information"
        },
        {
          "title": "公司介绍 - 飞策防爆电器股份有限公司",
          "type": "官网",
          "date": "2026-07-06访问",
          "url": "https://www.feice.com/about/profile.html"
        },
        {
          "title": "人力资源 - 飞策防爆电器股份有限公司",
          "type": "招聘入口",
          "date": "2026-07-06访问",
          "url": "https://www.feice.com/recruit"
        },
        {
          "title": "校园招聘 - 飞策防爆电器股份有限公司",
          "type": "招聘入口",
          "date": "2026-07-06访问",
          "url": "https://www.feice.com/recruit/recruitment-information/campus-recruitment"
        },
        {
          "title": "技术员/工程师 - 飞策防爆电器股份有限公司",
          "type": "招聘公告",
          "date": "2021-09-08",
          "url": "https://www.feice.com/recruit/recruitment-information/social-recruitment-8.html"
        }
      ]
    }
  },
  {
    "id": 54,
    "name": "大连度达理工安全系统有限公司",
    "ownership": "民企",
    "city": "大连市",
    "region": "辽宁省",
    "salaryRange": "未知",
    "schedule": "待核对",
    "scaleOrIndustry": "爆炸安全防护 / 压力泄压",
    "highlights": [
      "爆破片",
      "阻火器",
      "无焰泄放",
      "爆炸抑制"
    ],
    "positions": "安全工程师、产品研发、工艺设计等岗位待核对",
    "education": "本科及以上",
    "website": "https://www.duta.com.cn/about",
    "links": [
      {
        "title": "大连度达理工安全系统有限公司官网关于页",
        "type": "官网",
        "url": "https://www.duta.com.cn/about",
        "note": "介绍爆炸防护与泄放系统研究背景。"
      },
      {
        "title": "大连度达理工安全系统有限公司官网",
        "type": "官网",
        "url": "https://www.duta.com.cn/",
        "note": "企业官方主页。"
      }
    ],
    "description": "爆炸防护和超压泄放安全系统企业。",
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "高",
      "updatedAt": "2026-07-06",
      "summary": "已核对独立官网与公开业务方向；招聘平台及招聘公告入口待进一步验证。",
      "verifiedFields": [
        "企业全称",
        "企业性质",
        "业务与产品方向",
        "主要入口链接"
      ],
      "pendingFields": [
        "最新公开校招简章",
        "最新薪资待遇反馈",
        "真实作息制度",
        "具体工作地点分布"
      ]
    },
    "research": {
      "updatedAt": "2026-07-06",
      "status": "适合作为防爆与爆炸防护配套链企业候选。",
      "relevanceLevel": "高",
      "conclusion": "大连度达理工主营爆破片、阻火器、无焰泄放、爆炸抑制等产品，方向匹配弹药与爆炸技术的爆炸安全防护。具体岗位、作息和待遇（待核对），尚无官方招聘直接佐证，岗位多落在产品、技术和测试线。",
      "keySignals": [
        "拥有稳定的独立官方网站。",
        "主营产品在防爆电器、静电防爆或爆炸防护链条中方向直接。",
        "适合作为安全、防爆检测技术等方向交叉背景参考。"
      ],
      "suitableFor": [
        "关注防爆电器、工业爆炸防护装备及配套的学生。",
        "希望寻找长三角或华东区域防爆制造板块的学生。"
      ],
      "risks": [
        "当前无公开可考证的薪资与作息数据。",
        "具体生产及研发岗位的学历门槛可能发生变化。",
        "独立校招公告需按学校就业网最新批次更新。"
      ],
      "sources": [
        {
          "title": "大连度达理工安全系统有限公司官网",
          "type": "官网",
          "date": "2026-06-10访问",
          "url": "https://www.duta.com.cn/about"
        },
        {
          "title": "大连度达理工安全系统有限公司官网",
          "type": "官网",
          "date": "2026-07-06访问",
          "url": "https://www.duta.com.cn/"
        },
        {
          "title": "新闻动态 - 大连度达理工安全系统有限公司",
          "type": "新闻资料",
          "date": "2026-07-06访问",
          "url": "https://www.duta.com.cn/Content/index/catid/49.html"
        },
        {
          "title": "爆破片 - 大连度达理工安全系统有限公司",
          "type": "官网",
          "date": "2026-07-06访问",
          "url": "https://www.duta.com.cn/Content/index/catid/27.html"
        },
        {
          "title": "安全防爆系统 - 大连度达理工安全系统有限公司",
          "type": "官网",
          "date": "2026-07-06访问",
          "url": "https://www.duta.com.cn/Content/index/catid/181.html"
        },
        {
          "title": "隔爆系统 - 大连度达理工安全系统有限公司",
          "type": "官网",
          "date": "2026-07-06访问",
          "url": "https://www.duta.com.cn/Content/index/catid/187.html"
        }
      ]
    }
  },
  {
    "id": 55,
    "name": "江苏八方安全设备有限公司",
    "ownership": "民企",
    "city": "徐州市",
    "region": "江苏省",
    "salaryRange": "未知",
    "schedule": "待核对",
    "scaleOrIndustry": "安全泄压设备 / 阻火安全",
    "highlights": [
      "阻火器",
      "呼吸阀",
      "爆破片",
      "安全泄压"
    ],
    "positions": "机械设计、安全技术支持、生产检验等岗位待核对",
    "education": "待核对",
    "website": "https://www.basco.cc/",
    "links": [
      {
        "title": "江苏八方安全设备有限公司官网",
        "type": "官网",
        "url": "https://www.basco.cc/",
        "note": "展示阻火器、爆破片等泄压设备。"
      }
    ],
    "description": "阻火器和安全泄压设备企业。",
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "高",
      "updatedAt": "2026-07-06",
      "summary": "已核对独立官网与公开业务方向；招聘平台及招聘公告入口待进一步验证。",
      "verifiedFields": [
        "企业全称",
        "企业性质",
        "业务与产品方向",
        "主要入口链接"
      ],
      "pendingFields": [
        "最新公开校招简章",
        "最新薪资待遇反馈",
        "真实作息制度",
        "具体工作地点分布"
      ]
    },
    "research": {
      "updatedAt": "2026-07-06",
      "status": "适合作为防爆与爆炸防护配套链企业候选。",
      "relevanceLevel": "高",
      "conclusion": "江苏八方主营阻火器、呼吸阀、爆破片、安全泄压等产品，方向匹配弹药与爆炸技术的安全泄压防护。具体岗位、作息和待遇（待核对），尚无官方招聘直接佐证，岗位多落在产品与技术线。",
      "keySignals": [
        "拥有稳定的独立官方网站。",
        "主营产品在防爆电器、静电防爆或爆炸防护链条中方向直接。",
        "适合作为安全、防爆检测技术等方向交叉背景参考。"
      ],
      "suitableFor": [
        "关注防爆电器、工业爆炸防护装备及配套的学生。",
        "希望寻找长三角或华东区域防爆制造板块的学生。"
      ],
      "risks": [
        "当前无公开可考证的薪资与作息数据。",
        "具体生产及研发岗位的学历门槛可能发生变化。",
        "独立校招公告需按学校就业网最新批次更新。"
      ],
      "sources": [
        {
          "title": "江苏八方安全设备有限公司官网",
          "type": "官网",
          "date": "2026-06-10访问",
          "url": "https://www.basco.cc/"
        },
        {
          "title": "关于八方 - 江苏八方安全设备有限公司",
          "type": "官网",
          "date": "2026-07-06访问",
          "url": "https://www.basco.cc/about"
        },
        {
          "title": "测试基地 - 江苏八方安全设备有限公司",
          "type": "官网",
          "date": "2026-07-06访问",
          "url": "https://www.basco.cc/csjd"
        },
        {
          "title": "阻火器 - 江苏八方安全设备有限公司",
          "type": "官网",
          "date": "2026-07-06访问",
          "url": "https://www.basco.cc/zhq"
        },
        {
          "title": "爆破片 - 江苏八方安全设备有限公司",
          "type": "官网",
          "date": "2026-07-06访问",
          "url": "https://www.basco.cc/bpp"
        },
        {
          "title": "市场监管总局 TSG 92-2026 新规今日正式实施，八方合规领跑，爆破片全面适配！",
          "type": "新闻资料",
          "date": "2026-07-01",
          "url": "https://www.basco.cc/hydt/459"
        }
      ]
    }
  },
  {
    "id": 56,
    "name": "上海华理安全装备有限公司",
    "ownership": "民企",
    "city": "上海市",
    "region": "上海市",
    "salaryRange": "未知",
    "schedule": "待核对",
    "scaleOrIndustry": "防爆安全装备 / 爆破片",
    "highlights": [
      "爆破片装置",
      "无焰泄放",
      "隔爆阀",
      "管道阻火"
    ],
    "positions": "防爆安全工程师、结构设计、检验工程师等岗位待核对",
    "education": "待核对",
    "website": "https://www.hl130.com/Home",
    "links": [
      {
        "title": "上海华理安全装备有限公司官网",
        "type": "官网",
        "url": "https://www.hl130.com/Home",
        "note": "依托高校成果转化，展示防爆泄压核心产品。"
      }
    ],
    "description": "爆破片和工业防爆安全装备企业。",
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "高",
      "updatedAt": "2026-07-06",
      "summary": "已核对独立官网与公开业务方向；招聘平台及招聘公告入口待进一步验证。",
      "verifiedFields": [
        "企业全称",
        "企业性质",
        "业务与产品方向",
        "主要入口链接"
      ],
      "pendingFields": [
        "最新公开校招简章",
        "最新薪资待遇反馈",
        "真实作息制度",
        "具体工作地点分布"
      ]
    },
    "research": {
      "updatedAt": "2026-07-06",
      "status": "适合作为防爆与爆炸防护配套链企业候选。",
      "relevanceLevel": "高",
      "conclusion": "上海华理主营爆破片装置、无焰泄放、隔爆阀、管道阻火等产品，方向匹配弹药与爆炸技术的防爆安全防护。具体岗位、作息和待遇（待核对），尚无官方招聘直接佐证，岗位多落在产品与技术线。",
      "keySignals": [
        "拥有稳定的独立官方网站。",
        "主营产品在防爆电器、静电防爆或爆炸防护链条中方向直接。",
        "适合作为安全、防爆检测技术等方向交叉背景参考。"
      ],
      "suitableFor": [
        "关注防爆电器、工业爆炸防护装备及配套的学生。",
        "希望寻找长三角或华东区域防爆制造板块的学生。"
      ],
      "risks": [
        "当前无公开可考证的薪资与作息数据。",
        "具体生产及研发岗位的学历门槛可能发生变化。",
        "独立校招公告需按学校就业网最新批次更新。"
      ],
      "sources": [
        {
          "title": "上海华理安全装备有限公司官网",
          "type": "官网",
          "date": "2026-06-10访问",
          "url": "https://www.hl130.com/Home"
        },
        {
          "title": "上海华理安全装备有限公司简介",
          "type": "官网",
          "date": "2026-07-06访问",
          "url": "https://www.hl130.com/page94"
        },
        {
          "title": "产品中心 - 上海华理安全装备有限公司",
          "type": "官网",
          "date": "2026-07-06访问",
          "url": "https://www.hl130.com/page100"
        },
        {
          "title": "爆破片装置产品 - 上海华理安全装备有限公司",
          "type": "官网",
          "date": "2026-07-06访问",
          "url": "https://www.hl130.com/page100?product_category=5"
        },
        {
          "title": "人才理念 - 上海华理安全装备有限公司",
          "type": "招聘入口",
          "date": "2026-07-06访问",
          "url": "https://www.hl130.com/page111"
        },
        {
          "title": "《上海科技报》守住安全生产的最后一道关 小小爆破片立下“大功劳”",
          "type": "新闻资料",
          "date": "2024-10-02",
          "url": "https://news.ecust.edu.cn/2024/1002/c160a184355/pagem.htm"
        }
      ]
    }
  },
  {
    "id": 57,
    "name": "中铁隧道局集团有限公司",
    "ownership": "国企",
    "city": "广州",
    "region": "广东省",
    "salaryRange": "未知",
    "schedule": "待核对",
    "scaleOrIndustry": "隧道及地下工程施工",
    "highlights": [
      "隧道施工",
      "地下工程",
      "中国中铁",
      "校园招聘"
    ],
    "positions": "施工技术、项目管理、爆破技术、安全管理",
    "education": "本科及以上",
    "website": "https://www.crtg.com/",
    "links": [
      {
        "title": "中铁隧道局集团官网",
        "type": "官网",
        "url": "https://www.crtg.com/",
        "note": "集团主页，含人才招聘入口。"
      },
      {
        "title": "中铁隧道局人才招聘",
        "type": "招聘入口",
        "url": "https://crtg.com/nav/rencaizhaopin.html",
        "note": "官网人才招聘栏目。"
      },
      {
        "title": "中铁隧道局集团有限公司2024届高校毕业生校园招聘简章",
        "type": "学校就业网",
        "url": "https://fte.kmust.edu.cn/info/1149/2198.htm",
        "note": "昆明理工大学就业网发布。"
      },
      {
        "title": "中铁隧道局集团有限公司2024届高校毕业生校园招聘简章",
        "type": "学校就业网",
        "url": "https://xx.djtu.edu.cn/3/564.html",
        "note": "大连交通大学就业网发布。"
      },
      {
        "title": "中铁隧道局集团有限公司",
        "type": "新闻资料",
        "url": "https://www.crtg.com/news/gfgsdt/607.html",
        "note": "官网地址与企业信息页。"
      },
      {
        "title": "全国唯一！中铁隧道局入选“中国建造”隧道工程品牌企业",
        "type": "其他",
        "url": "https://crtg.com/nav/1994243823143747595.html",
        "note": "官网新闻 · 2022-08-26"
      }
    ],
    "description": "隶属中国中铁的隧道及地下工程施工央企。",
    "verification": {
      "status": "已核验",
      "relevanceLevel": "高",
      "updatedAt": "2026-07-06",
      "summary": "官网、人才招聘页和高校就业网简章均已对应到同一主体，主体与方向基本清晰。",
      "verifiedFields": [
        "name",
        "website",
        "city",
        "region",
        "ownership",
        "scaleOrIndustry",
        "positions",
        "education"
      ],
      "pendingFields": [
        "schedule",
        "salaryRange",
        "具体项目驻地",
        "证书要求"
      ]
    },
    "research": {
      "updatedAt": "2026-07-06",
      "status": "主体、业务方向和招聘入口已汇总，待遇与项目分配（待核对）。",
      "relevanceLevel": "高",
      "conclusion": "中铁隧道局集团有限公司是中国中铁旗下的隧道及地下工程施工主体，官网和高校就业网招聘都能对应到施工技术、项目管理、爆破和安全相关岗位。对弹药工程与爆炸技术专业而言，它更偏工程爆破和地下工程场景，适合愿意长期跑项目、接受现场施工节奏的毕业生。",
      "keySignals": [
        "中国中铁旗下隧道及地下工程施工主体",
        "官网保留人才招聘入口",
        "高校就业网有校招简章",
        "岗位涉及施工、项目管理和安全"
      ],
      "suitableFor": [
        "工程爆破方向",
        "地下工程与施工技术方向",
        "愿意接受项目制工作的毕业生"
      ],
      "risks": [
        "项目制驻地多，工作地点流动",
        "爆破相关岗位通常需要证书或现场经验",
        "具体薪资与作息（待核对）"
      ],
      "sources": [
        {
          "title": "中铁隧道局集团有限公司官网",
          "type": "官网",
          "date": "2026-07-06",
          "url": "https://www.crtg.com/"
        },
        {
          "title": "人才招聘 - 中铁隧道局",
          "type": "官网",
          "date": "2026-07-06",
          "url": "https://crtg.com/nav/rencaizhaopin.html"
        },
        {
          "title": "全国唯一！中铁隧道局入选“中国建造”隧道工程品牌企业",
          "type": "新闻资料",
          "date": "2022-08-26",
          "url": "https://crtg.com/nav/1994243823143747595.html"
        },
        {
          "title": "中铁隧道局集团有限公司2024届高校毕业生校园招聘简章",
          "type": "学校就业网",
          "date": "2024-03-15",
          "url": "https://fte.kmust.edu.cn/info/1149/2198.htm"
        },
        {
          "title": "中铁隧道局集团有限公司2024届高校毕业生校园招聘简章",
          "type": "学校就业网",
          "date": "2023-09-15",
          "url": "https://xx.djtu.edu.cn/3/564.html"
        },
        {
          "title": "中铁隧道局集团有限公司",
          "type": "官网",
          "date": "2026-07-06",
          "url": "https://www.crtg.com/news/gfgsdt/607.html"
        }
      ],
      "searchTrace": [
        {
          "round": 1,
          "queries": [
            "中铁隧道局集团有限公司官网",
            "中铁隧道局 人才招聘",
            "中铁隧道局 高校毕业生 校园招聘"
          ],
          "usefulFindings": [
            "官网保留人才招聘栏目",
            "高校就业网有校招简章",
            "企业主体归属中国中铁"
          ],
          "gaps": [
            "最新薪资范围",
            "具体项目驻地和作息"
          ]
        },
        {
          "round": 2,
          "queries": [
            "site:crtg.com 中铁隧道局 业务领域",
            "site:edu.cn 中铁隧道局 校招 简章"
          ],
          "usefulFindings": [
            "业务聚焦隧道及地下工程",
            "多所高校就业网转发招聘简章"
          ],
          "gaps": [
            "当年岗位人数",
            "证书要求的最新口径"
          ]
        }
      ]
    }
  },
  {
    "id": 58,
    "name": "上海化工研究院有限公司",
    "ownership": "国企",
    "city": "上海",
    "region": "上海市",
    "salaryRange": "未知",
    "schedule": "待核对",
    "scaleOrIndustry": "化工安全 / 检测评价",
    "highlights": [
      "化学品危险性鉴定",
      "检测评价",
      "华谊集团",
      "研究院"
    ],
    "positions": "检测、研发、环境咨询、评价服务",
    "education": "本科及以上",
    "website": "https://www.srici.com/",
    "links": [
      {
        "title": "上海化工研究院有限公司官网",
        "type": "官网",
        "url": "https://www.srici.com/",
        "note": "集团官网首页。"
      },
      {
        "title": "公司简介 - 上海化工研究院有限公司",
        "type": "官网",
        "url": "https://www.srici.com/info/gsjj",
        "note": "公司沿革与主营方向。"
      },
      {
        "title": "招聘信息 - 上海化工研究院有限公司",
        "type": "招聘入口",
        "url": "https://www.srici.com/list/zpxx",
        "note": "官网招聘信息页。"
      },
      {
        "title": "上海化工院招聘公告",
        "type": "学校就业网",
        "url": "https://hg.zzuli.edu.cn/2024/1102/c4433a322366/page.htm",
        "note": "郑州轻工业大学就业网。"
      },
      {
        "title": "【本、研，招聘信息】上海化工研究院有限公司",
        "type": "学校就业网",
        "url": "https://hgxy.ecust.edu.cn/2017/0323/c1231a61872/page.htm",
        "note": "华东理工大学相关就业信息。"
      },
      {
        "title": "关于上海华谊（集团）公司与上海化工研究院有限公司实施联合重组的公告",
        "type": "政府资料",
        "url": "https://www.gzw.sh.gov.cn/shgzw_sjb_xxgk_ggcz/20200224/0054-94229.html",
        "note": "政府资料 · 2020-02-24"
      },
      {
        "title": "上海化工研究院2019-2020 年度教育质量报告",
        "type": "其他",
        "url": "https://www.srici.com/upload/attach/202011/12/092544733.pdf",
        "note": "官方PDF · 2020"
      }
    ],
    "description": "华谊体系下的化工研究和检测评价机构。",
    "verification": {
      "status": "已核验",
      "relevanceLevel": "高",
      "updatedAt": "2026-07-06",
      "summary": "官网、集团重组公告和高校就业网招聘页能够互相印证，主体与化工安全方向清晰。",
      "verifiedFields": [
        "name",
        "website",
        "city",
        "region",
        "ownership",
        "scaleOrIndustry",
        "positions",
        "education"
      ],
      "pendingFields": [
        "schedule",
        "salaryRange",
        "具体岗位比例",
        "最新招聘人数"
      ]
    },
    "research": {
      "updatedAt": "2026-07-06",
      "status": "公开资料已汇总，核心方向和招聘入口较清楚，待遇与岗位比例仍需看最新公告。",
      "relevanceLevel": "高",
      "conclusion": "隶属华谊体系，核心方向是化工研究、危化品检测鉴定、环境咨询和技术服务。学校就业网招聘页可对应检测、研发和评价岗位；薪资、编制和排班（待核对），岗位分研发、检测和评价线。",
      "keySignals": [
        "华谊集团联合重组后的科研院所",
        "官网有招聘信息页",
        "公开资料强调危化品检测鉴定",
        "招聘岗位覆盖检测、研发和环境咨询"
      ],
      "suitableFor": [
        "化学、应用化学、化工安全方向",
        "检测评价、环境咨询方向",
        "想留在上海的理工科毕业生"
      ],
      "risks": [
        "研发岗学历门槛可能更高",
        "最新招聘人数和具体岗位需复核",
        "作息和薪资（待核对）"
      ],
      "sources": [
        {
          "title": "上海化工研究院有限公司",
          "type": "官网",
          "date": "2026-07-06",
          "url": "https://www.srici.com/"
        },
        {
          "title": "公司简介 - 上海化工研究院有限公司",
          "type": "官网",
          "date": "2025-02-25",
          "url": "https://www.srici.com/info/gsjj"
        },
        {
          "title": "招聘信息 - 上海化工研究院有限公司",
          "type": "官网",
          "date": "2026-07-06",
          "url": "https://www.srici.com/list/zpxx"
        },
        {
          "title": "关于上海华谊（集团）公司与上海化工研究院有限公司实施联合重组的公告",
          "type": "政府资料",
          "date": "2020-02-24",
          "url": "https://www.gzw.sh.gov.cn/shgzw_sjb_xxgk_ggcz/20200224/0054-94229.html"
        },
        {
          "title": "上海化工院招聘公告",
          "type": "学校就业网",
          "date": "2024-10-31",
          "url": "https://hg.zzuli.edu.cn/2024/1102/c4433a322366/page.htm"
        },
        {
          "title": "【本、研，招聘信息】上海化工研究院有限公司",
          "type": "学校就业网",
          "date": "2016-11-08",
          "url": "https://hgxy.ecust.edu.cn/2017/0323/c1231a61872/page.htm"
        },
        {
          "title": "上海化工研究院2019-2020 年度教育质量报告",
          "type": "其他",
          "date": "2020",
          "url": "https://www.srici.com/upload/attach/202011/12/092544733.pdf"
        }
      ],
      "searchTrace": [
        {
          "round": 1,
          "queries": [
            "上海化工研究院有限公司官网",
            "上海化工研究院 招聘",
            "上海化工研究院 危险性鉴定"
          ],
          "usefulFindings": [
            "官网存在招聘信息页",
            "华谊集团联合重组公告可查",
            "公开资料提到危化品危险性鉴定"
          ],
          "gaps": [
            "最新校招人数",
            "具体作息和福利口径"
          ]
        },
        {
          "round": 2,
          "queries": [
            "site:srici.com 上海化工研究院 检测",
            "site:edu.cn 上海化工研究院 招聘"
          ],
          "usefulFindings": [
            "学校就业网有招聘简章",
            "官网介绍其检测与技术服务方向"
          ],
          "gaps": [
            "岗位分布比例",
            "研究岗和检测岗占比"
          ]
        }
      ]
    }
  },
  {
    "id": 59,
    "name": "中国安能建设集团有限公司",
    "ownership": "国企",
    "city": "北京",
    "region": "北京市",
    "salaryRange": "未知",
    "schedule": "待核对",
    "scaleOrIndustry": "应急救援 / 重点工程建设",
    "highlights": [
      "应急救援",
      "重点工程建设",
      "水利水电",
      "定向爆破"
    ],
    "positions": "工程技术、应急救援、爆破技术、安全管理",
    "education": "本科及以上",
    "website": "https://www.china-an.cn/",
    "links": [
      {
        "title": "中国安能集团官网",
        "type": "官网",
        "url": "https://www.china-an.cn/",
        "note": "集团主页。"
      },
      {
        "title": "公司简介 - 中国安能",
        "type": "官网",
        "url": "https://www.china-an.cn/jtgk/index.html",
        "note": "官网公司简介。"
      },
      {
        "title": "中国安能建设集团有限公司2026年度校园招聘公告",
        "type": "招聘公告",
        "url": "https://www.china-an.cn/rlzy/rczp/art/2025/art_f3db16cb38eb4941aa26cc8d8c12286c.html",
        "note": "官网校招公告。"
      },
      {
        "title": "人才招聘 - 中国安能",
        "type": "招聘入口",
        "url": "https://www.china-an.cn/rlzy/rczp/index.html",
        "note": "官网招聘栏目。"
      },
      {
        "title": "中国安能集团第一工程局有限公司公司简介",
        "type": "新闻资料",
        "url": "https://eb1.china-an.cn/gsgk/index.html",
        "note": "含营业性爆破资质信息。"
      },
      {
        "title": "中国安能集团第二工程局有限公司2026年度公开招聘公告",
        "type": "招聘公告",
        "url": "https://www.china-an.cn/rlzy/rczp/art/2026/art_0980b4187dbd4ae6a2ff19163016627a.html",
        "note": "招聘公告 · 2026-04-xx"
      },
      {
        "title": "打造工程应急救援“野战军”、国家队-演习演练",
        "type": "其他",
        "url": "https://www.china-an.cn/yjjy/yxyl/art/2026/art_086c9a9f3d0dd03d9f66f84af78d73d6.html",
        "note": "官网新闻 · 2026-07-06"
      }
    ],
    "description": "应急救援与重点工程建设央企。",
    "verification": {
      "status": "已核验",
      "relevanceLevel": "高",
      "updatedAt": "2026-07-06",
      "summary": "官网、招聘公告和下属单位简介能够对应到同一央企主体，转隶背景和业务方向清楚。",
      "verifiedFields": [
        "name",
        "website",
        "city",
        "region",
        "ownership",
        "scaleOrIndustry",
        "positions",
        "education"
      ],
      "pendingFields": [
        "schedule",
        "salaryRange",
        "具体项目分配",
        "岗位编制口径"
      ]
    },
    "research": {
      "updatedAt": "2026-07-06",
      "status": "主体背景、招聘入口和工程救援方向已核对，具体待遇与项目派驻仍需看当年公告。",
      "relevanceLevel": "高",
      "conclusion": "中国安能建设集团有限公司是由武警水电部队整体转隶组建的中央企业，主责是自然灾害工程救援和重点工程建设。公开招聘与下属单位资料显示，其涉及定向爆破、水利水电工程和营业性爆破资质，适合愿意去一线项目和应急救援场景的毕业生。",
      "keySignals": [
        "2018年由武警水电部队转隶组建",
        "主责是工程救援和重点工程建设",
        "下属单位公开写有营业性爆破一级资质",
        "公开材料出现定向爆破和水利水电工程"
      ],
      "suitableFor": [
        "工程爆破方向",
        "应急救援与抢险方向",
        "水利水电、土木、安全工程背景"
      ],
      "risks": [
        "应急救援和项目现场强度高",
        "工作地点可能跨省流动",
        "具体岗位、编制和薪资需看当年招聘公告"
      ],
      "sources": [
        {
          "title": "中国安能",
          "type": "官网",
          "date": "2026-07-06",
          "url": "https://www.china-an.cn/"
        },
        {
          "title": "公司简介 - 中国安能",
          "type": "官网",
          "date": "2026-07-06",
          "url": "https://www.china-an.cn/jtgk/index.html"
        },
        {
          "title": "中国安能建设集团有限公司2026年度校园招聘公告",
          "type": "招聘公告",
          "date": "2025-11-28",
          "url": "https://www.china-an.cn/rlzy/rczp/art/2025/art_f3db16cb38eb4941aa26cc8d8c12286c.html"
        },
        {
          "title": "人才招聘 - 中国安能",
          "type": "招聘入口",
          "date": "2026-07-06",
          "url": "https://www.china-an.cn/rlzy/rczp/index.html"
        },
        {
          "title": "中国安能集团第一工程局有限公司公司简介",
          "type": "官网",
          "date": "2026-07-06",
          "url": "https://eb1.china-an.cn/gsgk/index.html"
        },
        {
          "title": "中国安能集团第二工程局有限公司2026年度公开招聘公告",
          "type": "招聘公告",
          "date": "2026-04-xx",
          "url": "https://www.china-an.cn/rlzy/rczp/art/2026/art_0980b4187dbd4ae6a2ff19163016627a.html"
        },
        {
          "title": "打造工程应急救援“野战军”、国家队-演习演练",
          "type": "新闻资料",
          "date": "2026-07-06",
          "url": "https://www.china-an.cn/yjjy/yxyl/art/2026/art_086c9a9f3d0dd03d9f66f84af78d73d6.html"
        }
      ],
      "searchTrace": [
        {
          "round": 1,
          "queries": [
            "中国安能集团官网",
            "中国安能 2026 校园招聘",
            "中国安能 定向爆破"
          ],
          "usefulFindings": [
            "官网可查公司简介和招聘栏目",
            "公告明确转隶背景",
            "公开材料出现定向爆破与工程救援"
          ],
          "gaps": [
            "具体薪资范围",
            "最新项目驻地分布"
          ]
        },
        {
          "round": 2,
          "queries": [
            "site:china-an.cn 中国安能 爆破 一级资质",
            "site:china-an.cn 中国安能 工程救援"
          ],
          "usefulFindings": [
            "下属单位简介提到营业性爆破一级资质",
            "工程救援和重点工程建设方向稳定"
          ],
          "gaps": [
            "当年岗位人数",
            "不同工程局之间的分工边界"
          ]
        }
      ]
    }
  },
  {
    "id": 60,
    "name": "北京航天长峰股份有限公司",
    "ownership": "国企",
    "city": "北京",
    "region": "北京市",
    "salaryRange": "未知",
    "schedule": "待核对",
    "scaleOrIndustry": "公共安全 / 军工电子",
    "highlights": [
      "航天科工系统",
      "公共安全",
      "军工电子",
      "红外光电"
    ],
    "positions": "公共安全、军工电子、光电探测、系统集成",
    "education": "待核对",
    "website": "https://www.ascf.com.cn/",
    "links": [
      {
        "title": "北京航天长峰股份有限公司官网",
        "type": "官网",
        "url": "https://www.ascf.com.cn/",
        "note": "官网首页，含业务领域和投资者入口。"
      },
      {
        "title": "公司介绍 - 北京航天长峰",
        "type": "官网",
        "url": "https://www.ascf.com.cn/index.php?c=category&id=9",
        "note": "官网公司介绍栏目。"
      },
      {
        "title": "公共安全 - 北京航天长峰",
        "type": "官网",
        "url": "https://www.ascf.com.cn/index.php?c=category&id=30",
        "note": "官网业务领域入口。"
      },
      {
        "title": "招贤纳士 - 北京航天长峰",
        "type": "招聘入口",
        "url": "https://www.ascf.com.cn/index.php?c=category&id=25",
        "note": "官网人力资源入口。"
      },
      {
        "title": "北京航天长峰股份有限公司 600855",
        "type": "其他",
        "url": "https://www.sse.com.cn/assortment/stock/list/info/company/index.shtml?COMPANY_CODE=600855&tabActive=1",
        "note": "上交所上市公司资料入口。"
      },
      {
        "title": "电子科技大学就业网招聘信息",
        "type": "学校就业网",
        "url": "https://www.ese.uestc.edu.cn/info/5138/14846.htm",
        "note": "学校就业网招聘样本，具体岗位需按年份复核。"
      },
      {
        "title": "军工电子-红外光电 - 北京航天长峰",
        "type": "官网",
        "url": "https://www.ascf.com.cn/index.php?c=category&id=32",
        "note": "官网 · 2026-07-06"
      },
      {
        "title": "北京航天长峰股份有限公司2024年年度报告摘要",
        "type": "其他",
        "url": "https://static.cninfo.com.cn/finalpage/2025-04-29/1223364105.PDF",
        "note": "其他 · 2025-04-29"
      }
    ],
    "description": "航天科工系统公共安全与军工电子平台。",
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "中",
      "updatedAt": "2026-07-06",
      "summary": "官网、上交所入口、年度报告和学校就业网招聘样本已对应到同一主体，岗位与待遇（待核对）。",
      "verifiedFields": [
        "name",
        "website",
        "city",
        "region",
        "ownership",
        "scaleOrIndustry"
      ],
      "pendingFields": [
        "salaryRange",
        "schedule",
        "education",
        "具体岗位",
        "工作基地"
      ]
    },
    "research": {
      "updatedAt": "2026-07-06",
      "status": "主体、上市信息、业务方向和招聘入口已整理，岗位要求（待核对）。",
      "relevanceLevel": "中",
      "conclusion": "航天科工系统上市平台，业务覆盖公共安全、军工电子、电源和红外光电。和弹药工程属安全装备、探测与系统集成近相关，不是民爆或弹药生产企业；岗位、学历、薪资和基地（待核对）。",
      "keySignals": [
        "官网列出公共安全和军工电子业务",
        "上交所入口可核对上市主体信息",
        "年度报告可辅助核对业务板块",
        "学校就业网保留招聘样本"
      ],
      "suitableFor": [
        "公共安全系统方向",
        "军工电子与光电探测方向",
        "接受系统集成或工程交付场景的学生"
      ],
      "risks": [
        "业务包含医疗、公共安全和军工电子，不能整体写成爆炸相关",
        "学校就业网招聘样本需按年份和部门复核",
        "薪资、作息和工作基地没有稳定公开来源"
      ],
      "sources": [
        {
          "title": "北京航天长峰股份有限公司官网",
          "type": "官网",
          "date": "2026-07-06",
          "url": "https://www.ascf.com.cn/"
        },
        {
          "title": "公司介绍 - 北京航天长峰",
          "type": "官网",
          "date": "2026-07-06",
          "url": "https://www.ascf.com.cn/index.php?c=category&id=9"
        },
        {
          "title": "公共安全 - 北京航天长峰",
          "type": "官网",
          "date": "2026-07-06",
          "url": "https://www.ascf.com.cn/index.php?c=category&id=30"
        },
        {
          "title": "军工电子-红外光电 - 北京航天长峰",
          "type": "官网",
          "date": "2026-07-06",
          "url": "https://www.ascf.com.cn/index.php?c=category&id=32"
        },
        {
          "title": "北京航天长峰股份有限公司 600855",
          "type": "其他",
          "date": "2026-07-06",
          "url": "https://www.sse.com.cn/assortment/stock/list/info/company/index.shtml?COMPANY_CODE=600855&tabActive=1"
        },
        {
          "title": "北京航天长峰股份有限公司2024年年度报告摘要",
          "type": "其他",
          "date": "2025-04-29",
          "url": "https://static.cninfo.com.cn/finalpage/2025-04-29/1223364105.PDF"
        },
        {
          "title": "电子科技大学就业网招聘信息",
          "type": "学校就业网",
          "date": "2026-07-06",
          "url": "https://www.ese.uestc.edu.cn/info/5138/14846.htm"
        }
      ],
      "searchTrace": [
        {
          "round": 1,
          "queries": [
            "北京航天长峰股份有限公司官网",
            "北京航天长峰 600855 上交所",
            "北京航天长峰 招聘 学校就业网"
          ],
          "usefulFindings": [
            "官网首页展示股票代码和业务领域",
            "上交所入口可对应上市主体",
            "学校就业网存在招聘样本"
          ],
          "gaps": [
            "最新岗位明细",
            "薪资与作息"
          ]
        },
        {
          "round": 2,
          "queries": [
            "site:ascf.com.cn 公共安全 军工电子 红外光电",
            "北京航天长峰 2024 年年度报告 公共安全"
          ],
          "usefulFindings": [
            "官网业务领域包含公共安全、军工电子-电源和军工电子-红外光电",
            "年度报告摘要可作上市公司资料补充"
          ],
          "gaps": [
            "岗位与业务板块的逐项对应关系",
            "具体工作基地"
          ]
        }
      ]
    }
  },
  {
    "id": 61,
    "name": "中国船舶重工集团应急预警与救援装备股份有限公司",
    "ownership": "国企",
    "city": "武汉",
    "region": "湖北省",
    "salaryRange": "未知",
    "schedule": "待核对",
    "scaleOrIndustry": "应急救援装备",
    "highlights": [
      "中船系统",
      "应急装备",
      "救援处置",
      "官网招聘"
    ],
    "positions": "应急装备研发、机械设计、电气控制、工程服务",
    "education": "本科及以上",
    "website": "https://www.china-huazhou.com/",
    "links": [
      {
        "title": "中船应急官网",
        "type": "官网",
        "url": "https://www.china-huazhou.com/",
        "note": "官网首页。"
      },
      {
        "title": "公司简介 - 中船应急",
        "type": "官网",
        "url": "https://www.china-huazhou.com/about.aspx?nid=1&typeid=1",
        "note": "官网公司简介，含主体、地点和业务说明。"
      },
      {
        "title": "应急交通工程装备 - 中船应急",
        "type": "官网",
        "url": "https://www.china-huazhou.com/products.aspx?nid=3&typeid=10",
        "note": "官网产品与服务栏目。"
      },
      {
        "title": "应急救援处置装备 - 中船应急",
        "type": "官网",
        "url": "https://www.china-huazhou.com/products.aspx?nid=3&typeid=79",
        "note": "官网产品与服务栏目。"
      },
      {
        "title": "人才招聘 - 中船应急",
        "type": "招聘入口",
        "url": "https://www.china-huazhou.com/rczplist.aspx?nid=27&typeid=67",
        "note": "官网人才招聘栏目，含人才引进计划。"
      },
      {
        "title": "中船应急 300527",
        "type": "其他",
        "url": "https://www.cninfo.com.cn/new/disclosure/stock?stockCode=300527&orgId=9900024348",
        "note": "巨潮资讯上市公司公告入口。"
      },
      {
        "title": "消防救生装备 - 中船应急",
        "type": "官网",
        "url": "https://www.china-huazhou.com/products.aspx?nid=3&typeid=13",
        "note": "官网 · 2026-07-06"
      }
    ],
    "description": "中船系统应急预警与救援装备企业。",
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "中",
      "updatedAt": "2026-07-06",
      "summary": "官网、公司简介、产品页、招聘栏目和公告入口均能对应到同一主体，待遇和岗位细节（待核对）。",
      "verifiedFields": [
        "name",
        "website",
        "city",
        "region",
        "ownership",
        "scaleOrIndustry",
        "positions",
        "education"
      ],
      "pendingFields": [
        "salaryRange",
        "schedule",
        "具体岗位人数",
        "出差强度",
        "工作基地"
      ]
    },
    "research": {
      "updatedAt": "2026-07-06",
      "status": "主体、产品方向、招聘栏目和上市公告入口已整理，具体岗位与待遇仍需按最新计划复核。",
      "relevanceLevel": "中",
      "conclusion": "中国船舶重工集团应急预警与救援装备股份有限公司是中船系统应急装备主体，官网简介、产品页和招聘栏目覆盖应急交通、救援处置、消防救生等方向。和弹药工程属安全与应急装备近相关，机械、电气、流体力学和工程服务方向可继续核对。",
      "keySignals": [
        "官网公司简介对应中船集团下属单位和武汉主体",
        "产品页列出应急交通工程装备",
        "产品页列出应急救援处置装备",
        "官网人才招聘栏目含近年人才引进计划"
      ],
      "suitableFor": [
        "应急救援装备方向",
        "机械设计与电气控制方向",
        "能接受装备制造和工程服务场景的学生"
      ],
      "risks": [
        "方向偏应急装备，不是民爆或弹药制造主体",
        "岗位、基地和出差强度（待核对）",
        "薪资和作息没有稳定公开来源"
      ],
      "sources": [
        {
          "title": "中船应急官网",
          "type": "官网",
          "date": "2026-07-06",
          "url": "https://www.china-huazhou.com/"
        },
        {
          "title": "公司简介 - 中船应急",
          "type": "官网",
          "date": "2026-07-06",
          "url": "https://www.china-huazhou.com/about.aspx?nid=1&typeid=1"
        },
        {
          "title": "应急交通工程装备 - 中船应急",
          "type": "官网",
          "date": "2026-07-06",
          "url": "https://www.china-huazhou.com/products.aspx?nid=3&typeid=10"
        },
        {
          "title": "应急救援处置装备 - 中船应急",
          "type": "官网",
          "date": "2026-07-06",
          "url": "https://www.china-huazhou.com/products.aspx?nid=3&typeid=79"
        },
        {
          "title": "消防救生装备 - 中船应急",
          "type": "官网",
          "date": "2026-07-06",
          "url": "https://www.china-huazhou.com/products.aspx?nid=3&typeid=13"
        },
        {
          "title": "人才招聘 - 中船应急",
          "type": "招聘入口",
          "date": "2026-07-06",
          "url": "https://www.china-huazhou.com/rczplist.aspx?nid=27&typeid=67"
        },
        {
          "title": "中船应急 300527",
          "type": "其他",
          "date": "2026-07-06",
          "url": "https://www.cninfo.com.cn/new/disclosure/stock?stockCode=300527&orgId=9900024348"
        }
      ],
      "searchTrace": [
        {
          "round": 1,
          "queries": [
            "中国船舶重工集团应急预警与救援装备股份有限公司官网",
            "中船应急 公司简介",
            "中船应急 人才招聘"
          ],
          "usefulFindings": [
            "官网可打开并对应主体全称",
            "公司简介说明中船系统、武汉总部和应急装备方向",
            "官网人才招聘栏目保留近年招聘计划"
          ],
          "gaps": [
            "最新岗位录用条件的逐条核对",
            "薪资与作息"
          ]
        },
        {
          "round": 2,
          "queries": [
            "site:china-huazhou.com 应急交通工程装备",
            "site:china-huazhou.com 应急救援处置装备",
            "中船应急 300527 巨潮资讯"
          ],
          "usefulFindings": [
            "官网产品页列出应急交通工程装备",
            "官网产品页列出应急救援处置装备和消防救生装备",
            "巨潮入口可作为上市公告补充"
          ],
          "gaps": [
            "具体岗位对应产品板块",
            "工作基地和出差频率"
          ]
        }
      ]
    }
  },
  {
    "id": 62,
    "name": "浙江新联民爆集团股份有限公司",
    "ownership": "国企",
    "city": "杭州",
    "region": "浙江省",
    "salaryRange": "未知",
    "schedule": "待核对",
    "scaleOrIndustry": "民用爆破器材 / 爆破服务",
    "highlights": [
      "浙江省属国企",
      "工业炸药",
      "数码电子雷管",
      "爆破服务"
    ],
    "positions": "民爆技术、化工工程、安全工程、爆破工程",
    "education": "本科及以上",
    "website": "http://www.zjxlmb.com/",
    "links": [
      {
        "title": "浙江新联民爆集团股份有限公司官网",
        "type": "官网",
        "url": "http://www.zjxlmb.com/",
        "note": "官网首页。"
      },
      {
        "title": "公司简介 - 浙江新联民爆",
        "type": "官网",
        "url": "http://www.zjxlmb.com/about_zh/id/1.html",
        "note": "官网公司简介。"
      },
      {
        "title": "产品服务 - 浙江新联民爆",
        "type": "官网",
        "url": "http://www.zjxlmb.com/product_zh.html",
        "note": "工业炸药、起爆器材和爆破服务入口。"
      },
      {
        "title": "人才招聘 - 浙江新联民爆",
        "type": "招聘入口",
        "url": "http://www.zjxlmb.com/news1_zh/typeid/7.html",
        "note": "官网信息公开下的人才招聘栏目。"
      },
      {
        "title": "浙江新联民爆器材有限公司2022年招聘简章",
        "type": "招聘公告",
        "url": "http://www.zjxlmb.com/news_detail1/id/149.html",
        "note": "官网历史招聘简章，最新岗位需复核。"
      },
      {
        "title": "联系我们 - 浙江新联民爆",
        "type": "官网",
        "url": "http://www.zjxlmb.com/con_zh.html",
        "note": "总部地址与联系方式。"
      }
    ],
    "description": "浙江国资民爆研发生产与爆破服务企业。",
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "高",
      "updatedAt": "2026-07-18",
      "summary": "官网简介、产品页和招聘栏目可对应同一浙江国资民爆主体，最新岗位与待遇（待核对）。",
      "verifiedFields": [
        "name",
        "website",
        "city",
        "region",
        "ownership",
        "scaleOrIndustry",
        "positions",
        "education"
      ],
      "pendingFields": [
        "salaryRange",
        "schedule",
        "最新校招岗位",
        "具体工作地点分配"
      ]
    },
    "research": {
      "updatedAt": "2026-07-18",
      "status": "主体、产品方向和招聘入口已整理，最新岗位与待遇仍需按官网公告核对。",
      "relevanceLevel": "高",
      "conclusion": "浙江新联民爆集团是浙江省机电集团体系内的综合性民爆企业，官网写明集民爆研发、生产、销售、配送和爆破服务于一体，有工业炸药与数码电子雷管生产许可线索。岗位集中在民爆生产、安全管理和工程爆破；薪资、作息与最新岗位（待核对）。",
      "keySignals": [
        "官网简介写明由浙江永联与物产民爆重组整合",
        "产品页列出工业炸药、导爆管雷管和爆破服务",
        "官网设有人才招聘栏目和历史招聘简章",
        "联系页给出杭州总部地址"
      ],
      "suitableFor": [
        "弹药工程与爆炸技术",
        "安全工程、化工工程",
        "关注浙江区域民爆国企的学生"
      ],
      "risks": [
        "官网招聘简章偏旧，最新岗位需复核",
        "生产一线与爆破现场作息可能不同于行政岗",
        "薪资和具体工作地点没有稳定公开口径"
      ],
      "sources": [
        {
          "title": "浙江新联民爆集团股份有限公司官网",
          "type": "官网",
          "date": "2026-07-18",
          "url": "http://www.zjxlmb.com/"
        },
        {
          "title": "公司简介 - 浙江新联民爆",
          "type": "官网",
          "date": "2026-07-18",
          "url": "http://www.zjxlmb.com/about_zh/id/1.html"
        },
        {
          "title": "产品服务 - 浙江新联民爆",
          "type": "官网",
          "date": "2026-07-18",
          "url": "http://www.zjxlmb.com/product_zh.html"
        },
        {
          "title": "人才招聘 - 浙江新联民爆",
          "type": "招聘入口",
          "date": "2026-07-18",
          "url": "http://www.zjxlmb.com/news1_zh/typeid/7.html"
        },
        {
          "title": "浙江新联民爆器材有限公司2022年招聘简章",
          "type": "招聘公告",
          "date": "2022-06-13",
          "url": "http://www.zjxlmb.com/news_detail1/id/149.html"
        },
        {
          "title": "联系我们 - 浙江新联民爆",
          "type": "官网",
          "date": "2026-07-18",
          "url": "http://www.zjxlmb.com/con_zh.html"
        }
      ],
      "searchTrace": [
        {
          "round": 1,
          "queries": [
            "浙江新联民爆集团股份有限公司 官网",
            "浙江新联民爆 招聘",
            "浙江新联民爆 工业炸药 数码电子雷管"
          ],
          "usefulFindings": [
            "官网可访问且主体名称一致",
            "公司简介写明浙江国资重组背景",
            "人才招聘栏目和历史招聘简章可查"
          ],
          "gaps": [
            "最新校招岗位明细",
            "薪资与作息"
          ]
        },
        {
          "round": 2,
          "queries": [
            "site:zjxlmb.com 公司简介 产品服务 人才招聘",
            "浙江新联民爆 杭州市和睦路"
          ],
          "usefulFindings": [
            "产品页覆盖炸药、起爆器材和爆破服务",
            "联系页给出杭州总部电话与地址"
          ],
          "gaps": [
            "分公司岗位分布",
            "应届生定薪口径"
          ]
        }
      ]
    }
  },
  {
    "id": 63,
    "name": "山东天宝化工股份有限公司",
    "ownership": "民企",
    "city": "临沂",
    "region": "山东省",
    "salaryRange": "未知",
    "schedule": "待核对",
    "scaleOrIndustry": "民用爆破器材 / 爆破服务",
    "highlights": [
      "凯龙股份控股",
      "工业炸药",
      "起爆具",
      "爆破服务"
    ],
    "positions": "化工技术、生产工艺、安全管理、爆破工程",
    "education": "专科及以上",
    "website": "http://www.tbhg.net/",
    "links": [
      {
        "title": "山东天宝化工股份有限公司官网",
        "type": "官网",
        "url": "http://www.tbhg.net/",
        "note": "官网首页。"
      },
      {
        "title": "关于我们 - 山东天宝化工",
        "type": "官网",
        "url": "http://www.tbhg.net/index.php?c=category&id=15",
        "note": "官网企业简介。"
      },
      {
        "title": "产品中心 - 山东天宝化工",
        "type": "官网",
        "url": "http://www.tbhg.net/index.php?c=category&id=23",
        "note": "乳化炸药、膨化炸药、导爆索、起爆具入口。"
      },
      {
        "title": "爆破服务 - 山东天宝化工",
        "type": "官网",
        "url": "http://www.tbhg.net/index.php?c=category&id=79",
        "note": "官网爆破服务栏目。"
      },
      {
        "title": "三体系管理再认证审核新闻",
        "type": "新闻资料",
        "url": "http://www.tbhg.net/index.php?c=show&id=489",
        "note": "官网最新资讯。"
      },
      {
        "title": "联系我们 - 山东天宝化工",
        "type": "官网",
        "url": "http://www.tbhg.net/index.php?c=category&id=31",
        "note": "临沂平邑联系方式。"
      }
    ],
    "description": "凯龙股份控股综合型民爆企业。",
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "高",
      "updatedAt": "2026-07-18",
      "summary": "官网简介、产品页和新闻可对应同一民爆主体，并写明凯龙股份控股关系；独立校招入口仍偏弱。",
      "verifiedFields": [
        "name",
        "website",
        "city",
        "region",
        "ownership",
        "scaleOrIndustry"
      ],
      "pendingFields": [
        "salaryRange",
        "schedule",
        "education",
        "最新招聘公告",
        "具体签约主体"
      ]
    },
    "research": {
      "updatedAt": "2026-07-18",
      "status": "主体、控股关系和产品方向已整理，最新招聘与待遇仍需补强。",
      "relevanceLevel": "高",
      "conclusion": "山东天宝化工是深交所上市公司凯龙股份控股子集团，业务覆盖民爆器材研发、生产、销售和爆破服务。产品页可见乳化炸药、膨化炸药、导爆索和起爆具，对口民爆生产与工程爆破；独立招聘入口和待遇口径（待核对）。",
      "keySignals": [
        "官网写明凯龙股份控股重组",
        "产品页覆盖炸药与起爆器材",
        "服务页写有一级资质爆破公司线索",
        "官网新闻持续更新安全与生产动态"
      ],
      "suitableFor": [
        "弹药工程与爆炸技术",
        "化工工程、安全工程",
        "关注山东区域民爆企业的学生"
      ],
      "risks": [
        "官网缺少稳定独立校招公告页",
        "岗位可能分布在生产线和爆破现场",
        "薪资、作息和签约主体需按最新渠道确认"
      ],
      "sources": [
        {
          "title": "山东天宝化工股份有限公司官网",
          "type": "官网",
          "date": "2026-07-18",
          "url": "http://www.tbhg.net/"
        },
        {
          "title": "关于我们 - 山东天宝化工",
          "type": "官网",
          "date": "2026-07-18",
          "url": "http://www.tbhg.net/index.php?c=category&id=15"
        },
        {
          "title": "产品中心 - 山东天宝化工",
          "type": "官网",
          "date": "2026-07-18",
          "url": "http://www.tbhg.net/index.php?c=category&id=23"
        },
        {
          "title": "爆破服务 - 山东天宝化工",
          "type": "官网",
          "date": "2026-07-18",
          "url": "http://www.tbhg.net/index.php?c=category&id=79"
        },
        {
          "title": "山东天宝化工股份有限公司顺利通过三体系管理再认证审核",
          "type": "新闻资料",
          "date": "2026-07-03",
          "url": "http://www.tbhg.net/index.php?c=show&id=489"
        },
        {
          "title": "联系我们 - 山东天宝化工",
          "type": "官网",
          "date": "2026-07-18",
          "url": "http://www.tbhg.net/index.php?c=category&id=31"
        }
      ],
      "searchTrace": [
        {
          "round": 1,
          "queries": [
            "山东天宝化工股份有限公司 官网",
            "山东天宝化工 凯龙股份",
            "山东天宝化工 乳化炸药 起爆具"
          ],
          "usefulFindings": [
            "官网可访问且主体一致",
            "企业简介写明凯龙股份控股",
            "产品与爆破服务栏目齐全"
          ],
          "gaps": [
            "独立招聘入口",
            "薪资与作息"
          ]
        },
        {
          "round": 2,
          "queries": [
            "site:tbhg.net 关于我们 产品中心 爆破服务",
            "山东天宝化工 平邑 联系方式"
          ],
          "usefulFindings": [
            "联系页给出临沂平邑地址和电话",
            "官网新闻可作近期经营证据"
          ],
          "gaps": [
            "最新校招样本",
            "岗位与学历明细"
          ]
        }
      ]
    }
  },
  {
    "id": 64,
    "name": "河北云山化工集团有限公司",
    "ownership": "民企",
    "city": "邢台",
    "region": "河北省",
    "salaryRange": "3000-5000元/月（官网样本，待核对）",
    "schedule": "待核对",
    "scaleOrIndustry": "民用爆破器材 / 爆破服务",
    "highlights": [
      "河北民爆骨干",
      "工业炸药",
      "爆破服务",
      "弹药工程岗位线索"
    ],
    "positions": "化工工艺、机械自动化、安全工程、弹药工程与爆炸技术、采矿工程",
    "education": "本科及以上",
    "website": "http://www.hbyunshan.com/",
    "links": [
      {
        "title": "河北云山化工集团有限公司官网",
        "type": "官网",
        "url": "http://www.hbyunshan.com/",
        "note": "官网首页。"
      },
      {
        "title": "关于我们 - 河北云山化工",
        "type": "官网",
        "url": "http://www.hbyunshan.com/yunshan123/bk_21545234.html",
        "note": "官网企业简介。"
      },
      {
        "title": "产品中心 - 河北云山化工",
        "type": "官网",
        "url": "http://www.hbyunshan.com/yunshan123/vip_doc/21545230_0_0_1.html",
        "note": "膨化炸药、乳化炸药入口。"
      },
      {
        "title": "人力资源 - 河北云山化工",
        "type": "招聘入口",
        "url": "http://www.hbyunshan.com/yunshan123/vip_doc/21545233_0_0_1.html",
        "note": "官网招聘岗位与专业要求。"
      },
      {
        "title": "新闻资讯 - 河北云山化工",
        "type": "新闻资料",
        "url": "http://www.hbyunshan.com/yunshan123/vip_doc/21567477_0_0_1.html",
        "note": "官网新闻栏目。"
      },
      {
        "title": "联系我们 - 河北云山化工",
        "type": "官网",
        "url": "http://www.hbyunshan.com/yunshan123/bk_21545235.html",
        "note": "邢台信都区联系方式。"
      }
    ],
    "description": "河北民爆科研生产与爆破服务企业。",
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "高",
      "updatedAt": "2026-07-18",
      "summary": "官网简介、产品页和人力资源页可对应同一河北民爆主体，且公开写到弹药工程相关专业；薪资样本偏旧，需复核。",
      "verifiedFields": [
        "name",
        "website",
        "city",
        "region",
        "scaleOrIndustry",
        "positions",
        "education"
      ],
      "pendingFields": [
        "ownership细节",
        "schedule",
        "最新薪资口径",
        "最新校招批次"
      ]
    },
    "research": {
      "updatedAt": "2026-07-18",
      "status": "主体、产品方向和招聘专业要求已整理，最新待遇与作息仍需核对。",
      "relevanceLevel": "高",
      "conclusion": "河北云山化工集团有限公司官网写明其是工信部民爆器材定点生产企业，业务覆盖民爆器材科研、生产、销售和爆破服务。人力资源页直接列出弹药工程与爆炸技术等专业方向，相关度高；但官网给出的待遇样本较粗，作息与最新岗位仍需按最新渠道确认。",
      "keySignals": [
        "官网写明工信部民爆定点生产企业",
        "产品页覆盖膨化炸药和乳化炸药",
        "人力资源页点名弹药工程与爆炸技术专业",
        "下属公司包含工程爆破和现场混装线索"
      ],
      "suitableFor": [
        "弹药工程与爆炸技术",
        "安全工程、化工工程",
        "采矿工程和爆破工程方向"
      ],
      "risks": [
        "官网薪资样本区间偏旧且口径粗",
        "生产与爆破一线岗位强度可能较高",
        "ownership与最新校招批次仍需复核"
      ],
      "sources": [
        {
          "title": "河北云山化工集团有限公司官网",
          "type": "官网",
          "date": "2026-07-18",
          "url": "http://www.hbyunshan.com/"
        },
        {
          "title": "关于我们 - 河北云山化工",
          "type": "官网",
          "date": "2026-07-18",
          "url": "http://www.hbyunshan.com/yunshan123/bk_21545234.html"
        },
        {
          "title": "产品中心 - 河北云山化工",
          "type": "官网",
          "date": "2026-07-18",
          "url": "http://www.hbyunshan.com/yunshan123/vip_doc/21545230_0_0_1.html"
        },
        {
          "title": "人力资源 - 河北云山化工",
          "type": "招聘入口",
          "date": "2026-07-18",
          "url": "http://www.hbyunshan.com/yunshan123/vip_doc/21545233_0_0_1.html"
        },
        {
          "title": "新闻资讯 - 河北云山化工",
          "type": "新闻资料",
          "date": "2026-07-18",
          "url": "http://www.hbyunshan.com/yunshan123/vip_doc/21567477_0_0_1.html"
        },
        {
          "title": "联系我们 - 河北云山化工",
          "type": "官网",
          "date": "2026-07-18",
          "url": "http://www.hbyunshan.com/yunshan123/bk_21545235.html"
        }
      ],
      "searchTrace": [
        {
          "round": 1,
          "queries": [
            "河北云山化工集团有限公司 官网",
            "河北云山化工 招聘 弹药工程",
            "河北云山化工 乳化炸药"
          ],
          "usefulFindings": [
            "官网可访问且主体一致",
            "关于我们页写明民爆定点生产企业",
            "人力资源页写到弹药工程专业"
          ],
          "gaps": [
            "最新校招批次",
            "作息安排"
          ]
        },
        {
          "round": 2,
          "queries": [
            "site:hbyunshan.com 人力资源 产品中心 新闻资讯",
            "河北云山化工 邢台 信都区"
          ],
          "usefulFindings": [
            "产品页和新闻页可支撑业务方向",
            "联系页给出邢台信都区地址"
          ],
          "gaps": [
            "薪资样本时效",
            "ownership公开口径"
          ]
        }
      ]
    }
  },
  {
    "id": 65,
    "name": "浙江省高能爆破工程有限公司",
    "ownership": "民企",
    "city": "杭州",
    "region": "浙江省",
    "salaryRange": "未知",
    "schedule": "待核对",
    "scaleOrIndustry": "爆破工程 / 矿山工程",
    "highlights": [
      "爆破作业一级",
      "矿山总承包壹级",
      "废旧弹药销毁",
      "地质灾害治理"
    ],
    "positions": "爆破工程师、地下矿项目经理、工程技术、安全管理",
    "education": "本科及以上",
    "website": "http://www.gnbp.cn/",
    "links": [
      {
        "title": "浙江省高能爆破工程有限公司官网",
        "type": "官网",
        "url": "http://www.gnbp.cn/",
        "note": "官网首页。"
      },
      {
        "title": "企业简介 - 浙江省高能爆破",
        "type": "官网",
        "url": "http://www.gnbp.cn/home/about/index.html",
        "note": "官网企业简介与资质说明。"
      },
      {
        "title": "资质荣誉 - 浙江省高能爆破",
        "type": "官网",
        "url": "http://www.gnbp.cn/home/about/honor.html",
        "note": "参编标准与资质荣誉。"
      },
      {
        "title": "爆破工程业务 - 浙江省高能爆破",
        "type": "官网",
        "url": "http://www.gnbp.cn/home/business/detail.html?id=69",
        "note": "业务页含废旧弹药销毁线索。"
      },
      {
        "title": "人才招聘 - 浙江省高能爆破",
        "type": "招聘入口",
        "url": "http://www.gnbp.cn/home/contact/recruit.html",
        "note": "官网社会招聘与岗位要求。"
      }
    ],
    "description": "爆破工程与矿山治理一级资质企业。",
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "高",
      "updatedAt": "2026-07-18",
      "summary": "官网简介、资质页、业务页和招聘页可对应同一爆破工程主体，废旧弹药销毁线索明确；薪资与作息仍待核对。",
      "verifiedFields": [
        "name",
        "website",
        "city",
        "region",
        "scaleOrIndustry",
        "positions",
        "education"
      ],
      "pendingFields": [
        "ownership细节",
        "salaryRange",
        "schedule",
        "校招批次"
      ]
    },
    "research": {
      "updatedAt": "2026-07-18",
      "status": "主体、资质、业务和招聘入口已整理，薪资与校招批次仍需核对。",
      "relevanceLevel": "高",
      "conclusion": "浙江省高能爆破工程具备爆破作业一级和矿山工程施工总承包壹级等资质，业务覆盖矿山、拆除、隧道和地质灾害治理，业务页还有废旧弹药销毁技术线索，对口弹药与爆炸方向。当前招聘页偏社招，待遇和校招安排（待核对）。",
      "keySignals": [
        "官网写明爆破作业一级和矿山总承包壹级资质",
        "业务页出现废旧弹药销毁技术线索",
        "招聘页公开爆破工程师等岗位",
        "资质页显示参编多项爆破相关标准"
      ],
      "suitableFor": [
        "弹药工程与爆炸技术",
        "爆破工程、安全工程",
        "采矿、岩土和工程技术方向"
      ],
      "risks": [
        "现场爆破与矿山项目强度高",
        "当前公开招聘偏社会招聘",
        "薪资、作息和 ownership 细节仍需复核"
      ],
      "sources": [
        {
          "title": "浙江省高能爆破工程有限公司官网",
          "type": "官网",
          "date": "2026-07-18",
          "url": "http://www.gnbp.cn/"
        },
        {
          "title": "企业简介 - 浙江省高能爆破",
          "type": "官网",
          "date": "2026-07-18",
          "url": "http://www.gnbp.cn/home/about/index.html"
        },
        {
          "title": "资质荣誉 - 浙江省高能爆破",
          "type": "官网",
          "date": "2026-07-18",
          "url": "http://www.gnbp.cn/home/about/honor.html"
        },
        {
          "title": "爆破工程业务 - 浙江省高能爆破",
          "type": "官网",
          "date": "2026-07-18",
          "url": "http://www.gnbp.cn/home/business/detail.html?id=69"
        },
        {
          "title": "人才招聘 - 浙江省高能爆破",
          "type": "招聘入口",
          "date": "2026-07-18",
          "url": "http://www.gnbp.cn/home/contact/recruit.html"
        }
      ],
      "searchTrace": [
        {
          "round": 1,
          "queries": [
            "浙江省高能爆破工程有限公司 官网",
            "浙江省高能爆破 招聘",
            "浙江省高能爆破 爆破作业一级"
          ],
          "usefulFindings": [
            "官网可访问且主体一致",
            "企业简介写明一级爆破与矿山资质",
            "招聘页有爆破工程师岗位"
          ],
          "gaps": [
            "校招批次",
            "薪资作息"
          ]
        },
        {
          "round": 2,
          "queries": [
            "site:gnbp.cn 废旧弹药 资质荣誉 人才招聘",
            "浙江省高能爆破 参编 爆破安全规程"
          ],
          "usefulFindings": [
            "业务页出现废旧弹药销毁线索",
            "资质页列有参编标准"
          ],
          "gaps": [
            "ownership公开口径",
            "应届生定薪"
          ]
        }
      ]
    }
  },
  {
    "id": 66,
    "name": "四川航天川南火工技术有限公司",
    "ownership": "国企",
    "city": "泸州",
    "region": "四川省",
    "salaryRange": "硕士见习约7000元/月，上岗首年样本约19-25万元（招聘页样本，待核对）",
    "schedule": "待核对",
    "scaleOrIndustry": "航天火工品 / 军工配套",
    "highlights": [
      "航天科技集团",
      "航天火工品",
      "研究制造试验",
      "校招入口"
    ],
    "positions": "火工技术、先进制造、试验测试、研发工程",
    "education": "硕士及以上为主",
    "website": "https://schtcnhg.zhiye.com/",
    "links": [
      {
        "title": "四川航天川南火工技术有限公司招聘门户",
        "type": "招聘入口",
        "url": "https://schtcnhg.zhiye.com/",
        "note": "智联招聘门户首页。"
      },
      {
        "title": "校园招聘 - 川南火工",
        "type": "招聘入口",
        "url": "https://schtcnhg.zhiye.com/campus",
        "note": "招聘门户校园招聘入口。"
      },
      {
        "title": "全部职位列表 - 川南火工",
        "type": "招聘入口",
        "url": "https://schtcnhg.zhiye.com/jobs",
        "note": "招聘门户职位列表入口。"
      },
      {
        "title": "公司介绍与待遇说明资源页",
        "type": "招聘公告",
        "url": "https://portal-oss.zhiye.com/609096/resource/34567605-18ff-4a84-8ec0-57d8339d50d5.html",
        "note": "招聘门户挂载的公司介绍与薪酬样本页。"
      },
      {
        "title": "中国航天科技集团有限公司官网",
        "type": "官网",
        "url": "https://www.spacechina.com/",
        "note": "官网 · 2026-07-19"
      }
    ],
    "description": "航天科技七院火工品研究制造试验单位。",
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "高",
      "updatedAt": "2026-07-19",
      "summary": "招聘门户与挂载介绍页可对应同一航天火工主体，业务和校招入口清楚；独立企业官网与作息仍需补强。",
      "verifiedFields": [
        "name",
        "city",
        "region",
        "ownership",
        "scaleOrIndustry",
        "positions",
        "education"
      ],
      "pendingFields": [
        "独立企业官网",
        "schedule",
        "最新岗位明细",
        "签约主体与工作地点"
      ]
    },
    "research": {
      "updatedAt": "2026-07-19",
      "status": "主体归属、火工方向和校招入口已整理，独立官网与最新岗位仍需核对。",
      "relevanceLevel": "高",
      "conclusion": "四川航天川南火工技术有限公司隶属中国航天科技集团第七研究院，业务覆盖航天火工品研究、设计、制造、试验与服务，对口火工、含能和试验测试方向。当前主入口是招聘门户，独立官网、作息和最新岗位（待核对）。",
      "keySignals": [
        "招聘介绍页写明隶属航天科技七院",
        "公开材料强调航天火工品研究制造试验一体化",
        "招聘门户设有校园招聘和职位列表",
        "薪酬页给出硕士博士样本待遇"
      ],
      "suitableFor": [
        "弹药工程、火工品与含能材料方向",
        "机械、控制、材料相关研究生",
        "接受军工保密要求的学生"
      ],
      "risks": [
        "当前主入口是招聘门户，不是独立企业官网",
        "薪酬样本会随批次变化",
        "军工岗位通常有保密和体检要求"
      ],
      "sources": [
        {
          "title": "四川航天川南火工技术有限公司招聘门户",
          "type": "招聘入口",
          "date": "2026-07-19",
          "url": "https://schtcnhg.zhiye.com/"
        },
        {
          "title": "校园招聘 - 川南火工",
          "type": "招聘入口",
          "date": "2026-07-19",
          "url": "https://schtcnhg.zhiye.com/campus"
        },
        {
          "title": "全部职位列表 - 川南火工",
          "type": "招聘入口",
          "date": "2026-07-19",
          "url": "https://schtcnhg.zhiye.com/jobs"
        },
        {
          "title": "公司介绍与待遇说明资源页",
          "type": "招聘公告",
          "date": "2026-07-19",
          "url": "https://portal-oss.zhiye.com/609096/resource/34567605-18ff-4a84-8ec0-57d8339d50d5.html"
        },
        {
          "title": "中国航天科技集团有限公司官网",
          "type": "官网",
          "date": "2026-07-19",
          "url": "https://www.spacechina.com/"
        }
      ],
      "searchTrace": [
        {
          "round": 1,
          "queries": [
            "四川航天川南火工技术有限公司 招聘",
            "四川航天川南火工 航天科技七院",
            "四川航天川南火工 火工品"
          ],
          "usefulFindings": [
            "智联招聘门户可访问",
            "挂载介绍页写明七院归属和火工业务",
            "有校园招聘入口"
          ],
          "gaps": [
            "独立企业官网",
            "最新岗位明细"
          ]
        },
        {
          "round": 2,
          "queries": [
            "site:schtcnhg.zhiye.com 校园招聘 jobs",
            "四川航天川南火工 泸州 薪酬"
          ],
          "usefulFindings": [
            "招聘页给出泸州属地线索",
            "薪酬页有硕士博士样本"
          ],
          "gaps": [
            "作息安排",
            "签约主体与基地分布"
          ]
        }
      ]
    }
  },
  {
    "id": 67,
    "name": "湖南金石智造科技有限公司",
    "ownership": "民企",
    "city": "长沙",
    "region": "湖南省",
    "salaryRange": "未知",
    "schedule": "待核对",
    "scaleOrIndustry": "民爆装备 / 现场混装",
    "highlights": [
      "现场混装车",
      "乳化炸药地面站",
      "工业炸药产线",
      "火工机械"
    ],
    "positions": "电气工程师、机械工程师、装配调试、设计研发",
    "education": "本科及以上",
    "website": "http://www.hnkings.com/",
    "links": [
      {
        "title": "湖南金石智造科技有限公司官网",
        "type": "官网",
        "url": "http://www.hnkings.com/",
        "note": "官网首页。"
      },
      {
        "title": "公司简介 - 湖南金石智造",
        "type": "官网",
        "url": "http://www.hnkings.com/about/",
        "note": "官网公司简介。"
      },
      {
        "title": "现场混装车产品页",
        "type": "官网",
        "url": "http://www.hnkings.com/xchzc/",
        "note": "乳化炸药装药车等产品入口。"
      },
      {
        "title": "人才招聘 - 湖南金石智造",
        "type": "招聘入口",
        "url": "http://www.hnkings.com/job/",
        "note": "官网招聘岗位页。"
      },
      {
        "title": "联系方式 - 湖南金石智造",
        "type": "官网",
        "url": "http://www.hnkings.com/contact/",
        "note": "长沙高新区联系方式。"
      },
      {
        "title": "企业新闻 - 湖南金石智造",
        "type": "新闻资料",
        "url": "http://www.hnkings.com/company-news/",
        "note": "官网企业新闻。"
      }
    ],
    "description": "民爆现场混装与炸药产线装备企业。",
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "高",
      "updatedAt": "2026-07-19",
      "summary": "官网简介、产品页、招聘页和联系页可对应同一民爆装备主体；薪资与作息仍需核对。",
      "verifiedFields": [
        "name",
        "website",
        "city",
        "region",
        "scaleOrIndustry",
        "positions",
        "education"
      ],
      "pendingFields": [
        "salaryRange",
        "schedule",
        "ownership细节",
        "校招批次"
      ]
    },
    "research": {
      "updatedAt": "2026-07-19",
      "status": "主体、产品方向和招聘入口已整理，薪资与校招批次仍需核对。",
      "relevanceLevel": "高",
      "conclusion": "湖南金石智造依托金石资源集团，业务覆盖工业炸药技术装备、现场混装车和智能化生产线。产品页可见乳化炸药装药车、地下装药车和地面站，对口民爆装备、火工机械和自动化；当前公开招聘偏社招，待遇与校招安排（待核对）。",
      "keySignals": [
        "官网写明服务工业炸药生产与使用",
        "产品页覆盖现场混装车和地面站",
        "招聘页公开电气和机械工程师岗位",
        "联系页给出长沙高新区地址"
      ],
      "suitableFor": [
        "民爆装备与现场混装方向",
        "机械、电气、自动化背景",
        "关注矿山爆破装药设备的学生"
      ],
      "risks": [
        "当前公开岗位偏社会招聘",
        "薪资作息没有稳定公开口径",
        "设备现场调试可能涉及出差"
      ],
      "sources": [
        {
          "title": "湖南金石智造科技有限公司官网",
          "type": "官网",
          "date": "2026-07-19",
          "url": "http://www.hnkings.com/"
        },
        {
          "title": "公司简介 - 湖南金石智造",
          "type": "官网",
          "date": "2026-07-19",
          "url": "http://www.hnkings.com/about/"
        },
        {
          "title": "现场混装车产品页",
          "type": "官网",
          "date": "2026-07-19",
          "url": "http://www.hnkings.com/xchzc/"
        },
        {
          "title": "人才招聘 - 湖南金石智造",
          "type": "招聘入口",
          "date": "2026-07-19",
          "url": "http://www.hnkings.com/job/"
        },
        {
          "title": "联系方式 - 湖南金石智造",
          "type": "官网",
          "date": "2026-07-19",
          "url": "http://www.hnkings.com/contact/"
        },
        {
          "title": "企业新闻 - 湖南金石智造",
          "type": "新闻资料",
          "date": "2026-07-19",
          "url": "http://www.hnkings.com/company-news/"
        }
      ],
      "searchTrace": [
        {
          "round": 1,
          "queries": [
            "湖南金石智造科技有限公司 官网",
            "湖南金石智造 现场混装车",
            "湖南金石智造 招聘"
          ],
          "usefulFindings": [
            "官网可访问且主体一致",
            "产品页覆盖混装车和地面站",
            "招聘页有电气机械岗位"
          ],
          "gaps": [
            "校招批次",
            "薪资作息"
          ]
        },
        {
          "round": 2,
          "queries": [
            "site:hnkings.com 公司简介 人才招聘 联系方式",
            "湖南金石智造 长沙 高新区"
          ],
          "usefulFindings": [
            "简介页写明服务工业炸药装备",
            "联系页给出高新区地址"
          ],
          "gaps": [
            "ownership公开口径",
            "应届生定薪"
          ]
        }
      ]
    }
  },
  {
    "id": 68,
    "name": "浙江利化爆破工程有限公司",
    "ownership": "民企",
    "city": "丽水",
    "region": "浙江省",
    "salaryRange": "未知",
    "schedule": "待核对",
    "scaleOrIndustry": "爆破工程 / 民用爆破服务",
    "highlights": [
      "爆破作业资质",
      "矿山工程",
      "拆除爆破",
      "危险品销毁"
    ],
    "positions": "爆破工程技术、施工管理、安全管理、工程技术",
    "education": "待核对",
    "website": "http://www.lhbpgf.com/",
    "links": [
      {
        "title": "浙江利化爆破工程有限公司官网",
        "type": "官网",
        "url": "http://www.lhbpgf.com/",
        "note": "官网首页。"
      },
      {
        "title": "公司简介 - 浙江利化爆破",
        "type": "官网",
        "url": "http://www.lhbpgf.com/about.html",
        "note": "官网公司简介。"
      },
      {
        "title": "企业服务 - 浙江利化爆破",
        "type": "官网",
        "url": "http://www.lhbpgf.com/products.html",
        "note": "爆破工程与服务入口。"
      },
      {
        "title": "资质荣誉 - 浙江利化爆破",
        "type": "官网",
        "url": "http://www.lhbpgf.com/honors.html",
        "note": "爆破作业许可证和相关资质页。"
      },
      {
        "title": "人力资源 - 浙江利化爆破",
        "type": "招聘入口",
        "url": "http://www.lhbpgf.com/jobs.html",
        "note": "官网人力资源栏目，当前岗位内容偏旧。"
      },
      {
        "title": "联系我们 - 浙江利化爆破",
        "type": "官网",
        "url": "http://www.lhbpgf.com/contact.html",
        "note": "遂昌联系方式。"
      }
    ],
    "description": "浙江爆破工程与民用爆破服务企业。",
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "高",
      "updatedAt": "2026-07-19",
      "summary": "官网简介、服务页和资质页可对应同一爆破工程主体；招聘栏目偏旧，最新岗位需复核。",
      "verifiedFields": [
        "name",
        "website",
        "city",
        "region",
        "scaleOrIndustry"
      ],
      "pendingFields": [
        "salaryRange",
        "schedule",
        "education",
        "最新招聘公告",
        "ownership细节"
      ]
    },
    "research": {
      "updatedAt": "2026-07-19",
      "status": "主体、业务和资质已整理，最新招聘与待遇仍需补强。",
      "relevanceLevel": "高",
      "conclusion": "浙江利化爆破业务覆盖民用爆破器材相关服务、爆破工程、物流运输和矿山工程，公开爆破作业单位许可证等资质线索，对口爆破工程和安全方向。人力资源页内容偏旧，最新岗位、学历和待遇（待核对）。",
      "keySignals": [
        "官网简介写明爆破服务与矿山工程业务",
        "资质页公开爆破作业许可证等材料",
        "服务页覆盖拆除、土岩等爆破工程",
        "联系页给出丽水遂昌地址"
      ],
      "suitableFor": [
        "爆破工程与安全工程方向",
        "弹药工程与爆炸技术近相关学生",
        "关注浙江区域工程爆破岗位的学生"
      ],
      "risks": [
        "官网招聘页内容偏旧",
        "现场爆破岗位强度高",
        "薪资、作息和学历要求缺少稳定公开口径"
      ],
      "sources": [
        {
          "title": "浙江利化爆破工程有限公司官网",
          "type": "官网",
          "date": "2026-07-19",
          "url": "http://www.lhbpgf.com/"
        },
        {
          "title": "公司简介 - 浙江利化爆破",
          "type": "官网",
          "date": "2026-07-19",
          "url": "http://www.lhbpgf.com/about.html"
        },
        {
          "title": "企业服务 - 浙江利化爆破",
          "type": "官网",
          "date": "2026-07-19",
          "url": "http://www.lhbpgf.com/products.html"
        },
        {
          "title": "资质荣誉 - 浙江利化爆破",
          "type": "官网",
          "date": "2026-07-19",
          "url": "http://www.lhbpgf.com/honors.html"
        },
        {
          "title": "人力资源 - 浙江利化爆破",
          "type": "招聘入口",
          "date": "2026-07-19",
          "url": "http://www.lhbpgf.com/jobs.html"
        },
        {
          "title": "联系我们 - 浙江利化爆破",
          "type": "官网",
          "date": "2026-07-19",
          "url": "http://www.lhbpgf.com/contact.html"
        }
      ],
      "searchTrace": [
        {
          "round": 1,
          "queries": [
            "浙江利化爆破工程有限公司 官网",
            "浙江利化爆破 一级资质",
            "浙江利化爆破 招聘"
          ],
          "usefulFindings": [
            "官网可访问且主体一致",
            "简介页写明爆破服务与矿山工程",
            "资质页可查许可证线索"
          ],
          "gaps": [
            "最新招聘岗位",
            "薪资作息"
          ]
        },
        {
          "round": 2,
          "queries": [
            "site:lhbpgf.com 公司简介 资质荣誉 联系我们",
            "浙江利化爆破 遂昌"
          ],
          "usefulFindings": [
            "服务页覆盖拆除和土岩爆破",
            "联系页给出遂昌地址"
          ],
          "gaps": [
            "学历要求",
            "应届生入口"
          ]
        }
      ]
    }
  },
  {
    "id": 69,
    "name": "中科科正自动化工程有限公司",
    "ownership": "待核对",
    "city": "合肥",
    "region": "安徽省",
    "salaryRange": "未知",
    "schedule": "待核对",
    "scaleOrIndustry": "民爆智能装备 / 自动化产线",
    "highlights": [
      "自动化产线",
      "防爆生产线",
      "数智民爆",
      "计量包装"
    ],
    "positions": "机械设计、电气设计、项目实施、调试工程",
    "education": "大专及以上",
    "website": "https://www.zkkzgroup.com/",
    "links": [
      {
        "title": "中科科正自动化工程有限公司官网",
        "type": "官网",
        "url": "https://www.zkkzgroup.com/",
        "note": "集团官网首页。"
      },
      {
        "title": "集团简介 - 中科科正",
        "type": "官网",
        "url": "https://www.zkkzgroup.com/about.html",
        "note": "官网集团简介。"
      },
      {
        "title": "数智民爆 - 中科科正",
        "type": "官网",
        "url": "https://www.hfkzgc.com/product/45.html",
        "note": "业务站数智民爆栏目。"
      },
      {
        "title": "防爆生产线 - 中科科正",
        "type": "官网",
        "url": "https://www.hfkzgc.com/product.html",
        "note": "业务站产品中心入口。"
      },
      {
        "title": "招贤纳士 - 中科科正",
        "type": "招聘入口",
        "url": "https://www.zkkzgroup.com/jobs.html",
        "note": "官网招聘岗位页。"
      },
      {
        "title": "联系我们 - 中科科正",
        "type": "官网",
        "url": "https://www.zkkzgroup.com/contact.html",
        "note": "合肥联系方式。"
      },
      {
        "title": "中国科学院合肥物质科学研究院",
        "type": "其他",
        "url": "https://www.hf.cas.cn/",
        "note": "简介页提及的科研合作背景单位。"
      }
    ],
    "description": "民爆与化工自动化产线装备企业。",
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "高",
      "updatedAt": "2026-07-19",
      "summary": "官网简介、业务站民爆栏目和招聘页可对应同一自动化装备主体；股权性质和最新校招仍需核对。",
      "verifiedFields": [
        "name",
        "website",
        "city",
        "region",
        "scaleOrIndustry",
        "positions"
      ],
      "pendingFields": [
        "ownership",
        "salaryRange",
        "schedule",
        "education",
        "最新校招批次"
      ]
    },
    "research": {
      "updatedAt": "2026-07-19",
      "status": "主体、民爆相关装备方向和招聘入口已整理，股权性质与待遇仍需核对。",
      "relevanceLevel": "高",
      "conclusion": "中科科正自动化由中科院合肥物质科学研究院相关科研团队与地方企业联合组建，业务覆盖自动化产线和智能工厂，公开数智民爆、防爆生产线等栏目。对口民爆装备自动化；企业性质、最新岗位和待遇（待核对）。",
      "keySignals": [
        "官网简介写明中科院合肥物质科学研究院相关科研背景",
        "业务站公开数智民爆栏目",
        "产品入口包含防爆生产线",
        "招聘页有机械电气设计岗位"
      ],
      "suitableFor": [
        "民爆装备自动化方向",
        "机械、电气、自动化背景",
        "关注化工与危险品产线装备的学生"
      ],
      "risks": [
        "股权性质公开口径不完整",
        "招聘页岗位可能随批次变化",
        "薪资作息缺少稳定公开来源"
      ],
      "sources": [
        {
          "title": "中科科正自动化工程有限公司官网",
          "type": "官网",
          "date": "2026-07-19",
          "url": "https://www.zkkzgroup.com/"
        },
        {
          "title": "集团简介 - 中科科正",
          "type": "官网",
          "date": "2026-07-19",
          "url": "https://www.zkkzgroup.com/about.html"
        },
        {
          "title": "数智民爆 - 中科科正",
          "type": "官网",
          "date": "2026-07-19",
          "url": "https://www.hfkzgc.com/product/45.html"
        },
        {
          "title": "业务站产品中心 - 中科科正",
          "type": "官网",
          "date": "2026-07-19",
          "url": "https://www.hfkzgc.com/product.html"
        },
        {
          "title": "招贤纳士 - 中科科正",
          "type": "招聘入口",
          "date": "2026-07-19",
          "url": "https://www.zkkzgroup.com/jobs.html"
        },
        {
          "title": "联系我们 - 中科科正",
          "type": "官网",
          "date": "2026-07-19",
          "url": "https://www.zkkzgroup.com/contact.html"
        },
        {
          "title": "中国科学院合肥物质科学研究院",
          "type": "其他",
          "date": "2026-07-19",
          "url": "https://www.hf.cas.cn/"
        }
      ],
      "searchTrace": [
        {
          "round": 1,
          "queries": [
            "中科科正自动化工程有限公司 官网",
            "中科科正 数智民爆",
            "中科科正 招聘"
          ],
          "usefulFindings": [
            "集团官网与业务站均可访问",
            "简介页写明科研转化背景",
            "有数智民爆栏目"
          ],
          "gaps": [
            "ownership细节",
            "薪资作息"
          ]
        },
        {
          "round": 2,
          "queries": [
            "site:zkkzgroup.com 集团简介 招贤纳士 联系我们",
            "site:hfkzgc.com 数智民爆 防爆生产线"
          ],
          "usefulFindings": [
            "招聘页有机械电气岗位",
            "联系页给出合肥地址"
          ],
          "gaps": [
            "校招批次",
            "应届生定薪"
          ]
        }
      ]
    }
  },
  {
    "id": 70,
    "name": "北京中大爆破工程有限公司",
    "ownership": "民企",
    "city": "北京",
    "region": "北京市",
    "salaryRange": "未知",
    "schedule": "待核对",
    "scaleOrIndustry": "爆破工程 / 安全评估监理",
    "highlights": [
      "爆破作业壹级",
      "拆除爆破",
      "矿山爆破",
      "安全评估监理"
    ],
    "positions": "爆破工程技术人员、施工管理、安全管理",
    "education": "专科及以上",
    "website": "http://www.bjzdbp.com.cn/",
    "links": [
      {
        "title": "北京中大爆破工程有限公司官网",
        "type": "官网",
        "url": "http://www.bjzdbp.com.cn/",
        "note": "官网首页。"
      },
      {
        "title": "公司简介 - 北京中大爆破",
        "type": "官网",
        "url": "http://www.bjzdbp.com.cn/page/7.htm",
        "note": "官网公司简介与资质说明。"
      },
      {
        "title": "拆除爆破业务 - 北京中大爆破",
        "type": "官网",
        "url": "http://www.bjzdbp.com.cn/list/14/",
        "note": "业务领域入口。"
      },
      {
        "title": "人才招聘 - 北京中大爆破",
        "type": "招聘入口",
        "url": "http://www.bjzdbp.com.cn/list/5/",
        "note": "官网招聘页，岗位信息偏旧需复核。"
      },
      {
        "title": "联系我们 - 北京中大爆破",
        "type": "官网",
        "url": "http://www.bjzdbp.com.cn/page/6.htm",
        "note": "昌平区联系方式。"
      },
      {
        "title": "爆破拆除业绩 - 北京中大爆破",
        "type": "官网",
        "url": "http://www.bjzdbp.com.cn/page/47.htm",
        "note": "工程业绩入口。"
      }
    ],
    "description": "北京爆破工程与安全评估监理企业。",
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "高",
      "updatedAt": "2026-07-19",
      "summary": "官网简介、业务页、招聘页和联系页可对应同一爆破工程主体；招聘信息偏旧，最新岗位与待遇仍需复核。",
      "verifiedFields": [
        "name",
        "website",
        "city",
        "region",
        "scaleOrIndustry",
        "positions",
        "education"
      ],
      "pendingFields": [
        "salaryRange",
        "schedule",
        "ownership细节",
        "最新招聘批次"
      ]
    },
    "research": {
      "updatedAt": "2026-07-19",
      "status": "主体、资质、业务和招聘入口已整理，最新岗位与待遇仍需核对。",
      "relevanceLevel": "高",
      "conclusion": "北京中大爆破创立于 1993 年，主营爆破工程，公开爆破作业壹级及矿山工程等资质线索，业务覆盖拆除、土岩、矿山和水下爆破。对口工程爆破与安全管理；招聘页内容偏旧，薪资、作息和最新岗位（待核对）。",
      "keySignals": [
        "官网简介写明爆破作业壹级资质",
        "业务页覆盖拆除、矿山和土岩爆破",
        "招聘页公开爆破工程技术人员岗位",
        "联系页给出昌平区地址"
      ],
      "suitableFor": [
        "爆破工程与安全工程方向",
        "弹药工程与爆炸技术近相关学生",
        "关注北京区域工程爆破岗位的学生"
      ],
      "risks": [
        "官网招聘信息偏旧",
        "现场爆破岗位强度高",
        "薪资与作息缺少稳定公开口径"
      ],
      "sources": [
        {
          "title": "北京中大爆破工程有限公司官网",
          "type": "官网",
          "date": "2026-07-19",
          "url": "http://www.bjzdbp.com.cn/"
        },
        {
          "title": "公司简介 - 北京中大爆破",
          "type": "官网",
          "date": "2026-07-19",
          "url": "http://www.bjzdbp.com.cn/page/7.htm"
        },
        {
          "title": "拆除爆破业务 - 北京中大爆破",
          "type": "官网",
          "date": "2026-07-19",
          "url": "http://www.bjzdbp.com.cn/list/14/"
        },
        {
          "title": "人才招聘 - 北京中大爆破",
          "type": "招聘入口",
          "date": "2026-07-19",
          "url": "http://www.bjzdbp.com.cn/list/5/"
        },
        {
          "title": "联系我们 - 北京中大爆破",
          "type": "官网",
          "date": "2026-07-19",
          "url": "http://www.bjzdbp.com.cn/page/6.htm"
        },
        {
          "title": "爆破拆除业绩 - 北京中大爆破",
          "type": "官网",
          "date": "2026-07-19",
          "url": "http://www.bjzdbp.com.cn/page/47.htm"
        }
      ],
      "searchTrace": [
        {
          "round": 1,
          "queries": [
            "北京中大爆破工程有限公司 官网",
            "北京中大爆破 爆破作业壹级",
            "北京中大爆破 招聘"
          ],
          "usefulFindings": [
            "官网可访问且主体一致",
            "简介页写明爆破作业壹级资质",
            "招聘页有爆破工程技术岗位"
          ],
          "gaps": [
            "最新招聘批次",
            "薪资作息"
          ]
        },
        {
          "round": 2,
          "queries": [
            "site:bjzdbp.com.cn 公司简介 业务领域 人才招聘",
            "北京中大爆破 昌平 超前路"
          ],
          "usefulFindings": [
            "业务页覆盖拆除和矿山爆破",
            "联系页给出昌平地址"
          ],
          "gaps": [
            "ownership公开口径",
            "应届生入口"
          ]
        }
      ]
    }
  },
  {
    "id": 71,
    "name": "深圳市锐巽自动化设备有限公司",
    "ownership": "民企",
    "city": "深圳",
    "region": "广东省",
    "salaryRange": "未知",
    "schedule": "待核对",
    "scaleOrIndustry": "民爆自动化装备",
    "highlights": [
      "电子雷管装配线",
      "基础雷管装填线",
      "专精特新小巨人",
      "涉火涉爆装备"
    ],
    "positions": "机械设计、电气调试、自动化设备、项目实施",
    "education": "本科及以上",
    "website": "http://www.ruixunauto.com/",
    "links": [
      {
        "title": "深圳市锐巽自动化设备有限公司官网",
        "type": "官网",
        "url": "http://www.ruixunauto.com/",
        "note": "官网首页。"
      },
      {
        "title": "公司介绍 - 锐巽自动化",
        "type": "官网",
        "url": "http://www.ruixunauto.com/about",
        "note": "官网公司简介。"
      },
      {
        "title": "产品中心 - 锐巽自动化",
        "type": "官网",
        "url": "http://www.ruixunauto.com/equipment",
        "note": "电子雷管装配线等产品入口。"
      },
      {
        "title": "招聘 - 锐巽自动化",
        "type": "招聘入口",
        "url": "http://www.ruixunauto.com/recruitment",
        "note": "官网招聘栏目。"
      },
      {
        "title": "联系我们 - 锐巽自动化",
        "type": "官网",
        "url": "http://www.ruixunauto.com/contact",
        "note": "官网联系入口。"
      }
    ],
    "description": "电子雷管与民爆自动化产线装备企业。",
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "高",
      "updatedAt": "2026-07-19",
      "summary": "官网简介、产品页和招聘页可对应同一民爆自动化装备主体；具体岗位明细和待遇仍需复核。",
      "verifiedFields": [
        "name",
        "website",
        "city",
        "region",
        "ownership",
        "scaleOrIndustry"
      ],
      "pendingFields": [
        "salaryRange",
        "schedule",
        "education",
        "最新岗位明细",
        "工作地点分配"
      ]
    },
    "research": {
      "updatedAt": "2026-07-19",
      "status": "主体、民爆自动化产品和招聘入口已整理，最新岗位与待遇仍需核对。",
      "relevanceLevel": "高",
      "conclusion": "深圳锐巽聚焦涉火涉爆特种领域自动化整线装备，产品覆盖工业电子雷管装配线、引火元件蘸药生产线和基础雷管装填线，对口民爆装备自动化。公开招聘页岗位明细偏少，最新岗位与待遇口径（待核对）。",
      "keySignals": [
        "官网写明聚焦涉火涉爆自动化装备",
        "产品页列出电子雷管和基础雷管产线",
        "简介页写明专精特新小巨人身份",
        "官网设有社会招聘和校园招聘入口"
      ],
      "suitableFor": [
        "民爆装备自动化方向",
        "机械、电气、自动化背景",
        "关注电子雷管产线设备的学生"
      ],
      "risks": [
        "招聘页岗位明细不够完整",
        "设备现场调试可能涉及出差",
        "薪资作息缺少稳定公开口径"
      ],
      "sources": [
        {
          "title": "深圳市锐巽自动化设备有限公司官网",
          "type": "官网",
          "date": "2026-07-19",
          "url": "http://www.ruixunauto.com/"
        },
        {
          "title": "公司介绍 - 锐巽自动化",
          "type": "官网",
          "date": "2026-07-19",
          "url": "http://www.ruixunauto.com/about"
        },
        {
          "title": "产品中心 - 锐巽自动化",
          "type": "官网",
          "date": "2026-07-19",
          "url": "http://www.ruixunauto.com/equipment"
        },
        {
          "title": "招聘 - 锐巽自动化",
          "type": "招聘入口",
          "date": "2026-07-19",
          "url": "http://www.ruixunauto.com/recruitment"
        },
        {
          "title": "联系我们 - 锐巽自动化",
          "type": "官网",
          "date": "2026-07-19",
          "url": "http://www.ruixunauto.com/contact"
        }
      ],
      "searchTrace": [
        {
          "round": 1,
          "queries": [
            "深圳市锐巽自动化设备有限公司 官网",
            "锐巽自动化 电子雷管装配线",
            "锐巽自动化 招聘"
          ],
          "usefulFindings": [
            "官网可访问且主体一致",
            "产品页覆盖电子雷管和基础雷管产线",
            "招聘栏目可进入"
          ],
          "gaps": [
            "最新岗位明细",
            "薪资作息"
          ]
        },
        {
          "round": 2,
          "queries": [
            "site:ruixunauto.com 公司介绍 招聘 产品",
            "锐巽自动化 专精特新 小巨人"
          ],
          "usefulFindings": [
            "简介页写明专精特新小巨人",
            "总部在深圳光明区"
          ],
          "gaps": [
            "校招批次",
            "应届生定薪"
          ]
        }
      ]
    }
  },
  {
    "id": 72,
    "name": "深圳市大能智造科技有限公司",
    "ownership": "民企",
    "city": "深圳",
    "region": "广东省",
    "salaryRange": "未知",
    "schedule": "待核对",
    "scaleOrIndustry": "自动化装备 / 民爆自动化近相关",
    "highlights": [
      "民用爆破自动化工厂",
      "智能工厂",
      "自动化设备",
      "精密配比"
    ],
    "positions": "机械设计、电气调试、自动化设备、项目实施",
    "education": "本科及以上",
    "website": "http://www.dneim.com/",
    "links": [
      {
        "title": "深圳市大能智造科技有限公司官网",
        "type": "官网",
        "url": "http://www.dneim.com/",
        "note": "官网首页。"
      },
      {
        "title": "公司介绍 - 大能智造",
        "type": "官网",
        "url": "http://www.dneim.com/about",
        "note": "官网公司简介。"
      },
      {
        "title": "资质荣誉 - 大能智造",
        "type": "官网",
        "url": "http://www.dneim.com/about_honor",
        "note": "含中国爆破器材行业协会会员等线索。"
      },
      {
        "title": "招聘 - 大能智造",
        "type": "招聘入口",
        "url": "http://www.dneim.com/recruitment",
        "note": "官网招聘栏目。"
      },
      {
        "title": "联系我们 - 大能智造",
        "type": "官网",
        "url": "http://www.dneim.com/contact",
        "note": "官网联系入口。"
      }
    ],
    "description": "智能工厂与民爆自动化装备近相关企业。",
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "中",
      "updatedAt": "2026-07-19",
      "summary": "官网简介、荣誉页和招聘页可对应同一自动化装备主体，并公开民用爆破自动化业务线；不能抬成弹药或民爆生产主体。",
      "verifiedFields": [
        "name",
        "website",
        "city",
        "region",
        "ownership",
        "scaleOrIndustry"
      ],
      "pendingFields": [
        "salaryRange",
        "schedule",
        "education",
        "最新岗位明细",
        "民爆业务占比"
      ]
    },
    "research": {
      "updatedAt": "2026-07-19",
      "status": "主体、自动化业务和民爆相关栏目已整理，业务占比与最新岗位仍需核对。",
      "relevanceLevel": "中",
      "conclusion": "深圳市大能智造科技有限公司官网写明提供智能工厂和自动化设备方案，并公开民用爆破自动化工厂业务线。它更适合作为民爆装备自动化近相关候选，不应写成弹药或民爆生产主体；招聘入口可查，但最新岗位、待遇和民爆业务占比仍需继续确认。",
      "keySignals": [
        "官网公开民用爆破自动化工厂业务线",
        "荣誉页出现中国爆破器材行业协会会员线索",
        "公司简介写明智能工厂和自动化设备方向",
        "官网设有社会招聘和校园招聘入口"
      ],
      "suitableFor": [
        "自动化设备与智能工厂方向",
        "机械、电气、自动化背景",
        "关注民爆产线装备近相关岗位的学生"
      ],
      "risks": [
        "主业不只有民爆，不能整体写成民爆企业",
        "招聘页岗位明细不够完整",
        "薪资作息缺少稳定公开口径"
      ],
      "sources": [
        {
          "title": "深圳市大能智造科技有限公司官网",
          "type": "官网",
          "date": "2026-07-19",
          "url": "http://www.dneim.com/"
        },
        {
          "title": "公司介绍 - 大能智造",
          "type": "官网",
          "date": "2026-07-19",
          "url": "http://www.dneim.com/about"
        },
        {
          "title": "资质荣誉 - 大能智造",
          "type": "官网",
          "date": "2026-07-19",
          "url": "http://www.dneim.com/about_honor"
        },
        {
          "title": "招聘 - 大能智造",
          "type": "招聘入口",
          "date": "2026-07-19",
          "url": "http://www.dneim.com/recruitment"
        },
        {
          "title": "联系我们 - 大能智造",
          "type": "官网",
          "date": "2026-07-19",
          "url": "http://www.dneim.com/contact"
        }
      ],
      "searchTrace": [
        {
          "round": 1,
          "queries": [
            "深圳市大能智造科技有限公司 官网",
            "大能智造 民用爆破自动化工厂",
            "大能智造 招聘"
          ],
          "usefulFindings": [
            "官网可访问且主体一致",
            "首页和导航出现民用爆破自动化工厂",
            "招聘栏目可进入"
          ],
          "gaps": [
            "民爆业务占比",
            "最新岗位明细"
          ]
        },
        {
          "round": 2,
          "queries": [
            "site:dneim.com 公司介绍 资质荣誉 招聘",
            "大能智造 中国爆破器材行业协会"
          ],
          "usefulFindings": [
            "荣誉页出现爆破器材行业协会会员线索",
            "总部在深圳光明区"
          ],
          "gaps": [
            "薪资作息",
            "校招批次"
          ]
        }
      ]
    }
  },
  {
    "id": 73,
    "name": "广东中人爆破工程有限公司",
    "ownership": "民企",
    "city": "广州",
    "region": "广东省",
    "salaryRange": "未知",
    "schedule": "待核对",
    "scaleOrIndustry": "爆破工程 / 安全评估监理",
    "highlights": [
      "一级爆破资质",
      "拆除爆破",
      "矿山爆破",
      "安全监理"
    ],
    "positions": "爆破工程技术员、矿山爆破初级技术人员、施工管理",
    "education": "大专及以上",
    "website": "http://www.gdzrbp.com/",
    "links": [
      {
        "title": "广东中人爆破工程有限公司官网",
        "type": "官网",
        "url": "http://www.gdzrbp.com/",
        "note": "官网首页。"
      },
      {
        "title": "公司简介 - 广东中人爆破",
        "type": "官网",
        "url": "http://www.gdzrbp.com/html/about/1.html",
        "note": "官网公司简介与资质说明。"
      },
      {
        "title": "资质荣誉 - 广东中人爆破",
        "type": "官网",
        "url": "http://www.gdzrbp.com/html/zzrr/",
        "note": "资质荣誉栏目。"
      },
      {
        "title": "人才招聘 - 广东中人爆破",
        "type": "招聘入口",
        "url": "http://www.gdzrbp.com/html/job/",
        "note": "官网招聘页，含2024-2025岗位样本。"
      },
      {
        "title": "工程业绩 - 广东中人爆破",
        "type": "官网",
        "url": "http://www.gdzrbp.com/html/gcyj/",
        "note": "拆除与矿山爆破业绩入口。"
      },
      {
        "title": "联系方式 - 广东中人爆破",
        "type": "官网",
        "url": "http://www.gdzrbp.com/html/about/2.html",
        "note": "广州天河区联系方式。"
      }
    ],
    "description": "广东一级爆破设计施工与监理企业。",
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "高",
      "updatedAt": "2026-07-19",
      "summary": "官网简介、资质页、招聘页和业绩页可对应同一爆破工程主体；股权结构表述为国有参股，ownership 仍保守写民企。",
      "verifiedFields": [
        "name",
        "website",
        "city",
        "region",
        "scaleOrIndustry",
        "positions",
        "education"
      ],
      "pendingFields": [
        "salaryRange",
        "schedule",
        "ownership细节",
        "最新校招批次"
      ]
    },
    "research": {
      "updatedAt": "2026-07-19",
      "status": "主体、一级爆破资质、招聘入口和业绩已整理，最新待遇仍需核对。",
      "relevanceLevel": "高",
      "conclusion": "广东中人爆破具有一级爆破设计施工、安全评估和安全监理资质，业务覆盖城市拆除、矿山和隧道爆破。招聘页出现矿山爆破初级技术员和爆破工程技术员岗位，对口工程爆破；薪资、作息和最新批次（待核对）。",
      "keySignals": [
        "官网写明一级爆破设计施工与监理资质",
        "招聘页有矿山爆破和爆破工程技术岗位",
        "业绩页覆盖拆除与矿山爆破工程",
        "联系页给出广州天河区地址"
      ],
      "suitableFor": [
        "爆破工程与安全工程方向",
        "采矿、矿业工程相关学生",
        "关注广东区域工程爆破岗位的学生"
      ],
      "risks": [
        "现场爆破岗位强度高",
        "工作地点可能跨省",
        "薪资作息缺少稳定公开口径"
      ],
      "sources": [
        {
          "title": "广东中人爆破工程有限公司官网",
          "type": "官网",
          "date": "2026-07-19",
          "url": "http://www.gdzrbp.com/"
        },
        {
          "title": "公司简介 - 广东中人爆破",
          "type": "官网",
          "date": "2026-07-19",
          "url": "http://www.gdzrbp.com/html/about/1.html"
        },
        {
          "title": "资质荣誉 - 广东中人爆破",
          "type": "官网",
          "date": "2026-07-19",
          "url": "http://www.gdzrbp.com/html/zzrr/"
        },
        {
          "title": "人才招聘 - 广东中人爆破",
          "type": "招聘入口",
          "date": "2026-07-19",
          "url": "http://www.gdzrbp.com/html/job/"
        },
        {
          "title": "工程业绩 - 广东中人爆破",
          "type": "官网",
          "date": "2026-07-19",
          "url": "http://www.gdzrbp.com/html/gcyj/"
        },
        {
          "title": "联系方式 - 广东中人爆破",
          "type": "官网",
          "date": "2026-07-19",
          "url": "http://www.gdzrbp.com/html/about/2.html"
        }
      ],
      "searchTrace": [
        {
          "round": 1,
          "queries": [
            "广东中人爆破工程有限公司 官网",
            "广东中人爆破 一级资质",
            "广东中人爆破 招聘"
          ],
          "usefulFindings": [
            "官网可访问且主体一致",
            "简介页写明一级爆破资质",
            "招聘页有爆破技术岗位"
          ],
          "gaps": [
            "最新校招批次",
            "薪资作息"
          ]
        },
        {
          "round": 2,
          "queries": [
            "site:gdzrbp.com 公司简介 人才招聘 工程业绩",
            "广东中人爆破 天河区"
          ],
          "usefulFindings": [
            "业绩页覆盖拆除与矿山爆破",
            "联系页给出广州地址"
          ],
          "gaps": [
            "ownership细节",
            "应届生定薪"
          ]
        }
      ]
    }
  },
  {
    "id": 74,
    "name": "内蒙古生力民爆股份有限公司",
    "ownership": "民企",
    "city": "鄂尔多斯",
    "region": "内蒙古",
    "salaryRange": "未知",
    "schedule": "待核对",
    "scaleOrIndustry": "民用爆破器材 / 爆破服务",
    "highlights": [
      "工业炸药",
      "混装炸药地面站",
      "爆破服务",
      "区域民爆骨干"
    ],
    "positions": "民爆生产、爆破服务、安全管理、工程技术",
    "education": "待核对",
    "website": "http://www.shengliminbao.cn/",
    "links": [
      {
        "title": "内蒙古生力民爆股份有限公司官网",
        "type": "官网",
        "url": "http://www.shengliminbao.cn/",
        "note": "官网首页。"
      },
      {
        "title": "公司简介 - 内蒙古生力民爆",
        "type": "官网",
        "url": "http://www.shengliminbao.cn/aboutus.html",
        "note": "官网公司简介。"
      },
      {
        "title": "民爆产业 - 内蒙古生力民爆",
        "type": "官网",
        "url": "http://www.shengliminbao.cn/picnews/4/",
        "note": "产业介绍入口。"
      },
      {
        "title": "职位招聘 - 内蒙古生力民爆",
        "type": "招聘入口",
        "url": "http://www.shengliminbao.cn/joblist.aspx",
        "note": "官网职位招聘页，岗位样本偏旧。"
      },
      {
        "title": "企业新闻 - 内蒙古生力民爆",
        "type": "新闻资料",
        "url": "http://www.shengliminbao.cn/news/2/",
        "note": "官网企业新闻。"
      },
      {
        "title": "联系我们 - 内蒙古生力民爆",
        "type": "官网",
        "url": "http://www.shengliminbao.cn/onepage2.html",
        "note": "准格尔旗薛家湾联系方式。"
      }
    ],
    "description": "内蒙古区域民爆生产与爆破服务企业。",
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "高",
      "updatedAt": "2026-07-19",
      "summary": "官网简介、产业页、招聘页和联系页可对应同一区域民爆主体；招聘样本偏旧，最新岗位与待遇仍需复核。",
      "verifiedFields": [
        "name",
        "website",
        "city",
        "region",
        "ownership",
        "scaleOrIndustry"
      ],
      "pendingFields": [
        "salaryRange",
        "schedule",
        "education",
        "最新招聘公告",
        "具体签约主体"
      ]
    },
    "research": {
      "updatedAt": "2026-07-19",
      "status": "主体、民爆业务和招聘入口已整理，最新岗位与待遇仍需核对。",
      "relevanceLevel": "高",
      "conclusion": "内蒙古生力民爆业务覆盖工业炸药生产、销售和爆破服务，设有多个混装炸药地面站，是内蒙古区域民爆骨干主体。对口矿山民爆和爆破服务；招聘页样本偏旧，薪资、作息和最新岗位（待核对）。",
      "keySignals": [
        "官网写明工业炸药生产销售和爆破服务",
        "简介页提到多个混装炸药地面站",
        "职位招聘栏目可进入",
        "联系页给出鄂尔多斯准格尔旗地址"
      ],
      "suitableFor": [
        "弹药工程与爆炸技术",
        "采矿、安全工程方向",
        "关注内蒙古区域民爆企业的学生"
      ],
      "risks": [
        "官网招聘样本偏旧",
        "生产与爆破现场岗位强度高",
        "薪资作息缺少稳定公开口径"
      ],
      "sources": [
        {
          "title": "内蒙古生力民爆股份有限公司官网",
          "type": "官网",
          "date": "2026-07-19",
          "url": "http://www.shengliminbao.cn/"
        },
        {
          "title": "公司简介 - 内蒙古生力民爆",
          "type": "官网",
          "date": "2026-07-19",
          "url": "http://www.shengliminbao.cn/aboutus.html"
        },
        {
          "title": "民爆产业 - 内蒙古生力民爆",
          "type": "官网",
          "date": "2026-07-19",
          "url": "http://www.shengliminbao.cn/picnews/4/"
        },
        {
          "title": "职位招聘 - 内蒙古生力民爆",
          "type": "招聘入口",
          "date": "2026-07-19",
          "url": "http://www.shengliminbao.cn/joblist.aspx"
        },
        {
          "title": "企业新闻 - 内蒙古生力民爆",
          "type": "新闻资料",
          "date": "2026-07-19",
          "url": "http://www.shengliminbao.cn/news/2/"
        },
        {
          "title": "联系我们 - 内蒙古生力民爆",
          "type": "官网",
          "date": "2026-07-19",
          "url": "http://www.shengliminbao.cn/onepage2.html"
        }
      ],
      "searchTrace": [
        {
          "round": 1,
          "queries": [
            "内蒙古生力民爆股份有限公司 官网",
            "生力民爆 工业炸药",
            "生力民爆 招聘"
          ],
          "usefulFindings": [
            "官网可访问且主体一致",
            "简介页写明民爆生产和爆破服务",
            "职位招聘栏目可进入"
          ],
          "gaps": [
            "最新招聘批次",
            "薪资作息"
          ]
        },
        {
          "round": 2,
          "queries": [
            "site:shengliminbao.cn 公司简介 职位招聘 联系我们",
            "生力民爆 准格尔旗 薛家湾"
          ],
          "usefulFindings": [
            "联系页给出薛家湾地址",
            "新闻页有环境与固废信息公开"
          ],
          "gaps": [
            "学历要求",
            "应届生入口"
          ]
        }
      ]
    }
  },
  {
    "id": 75,
    "name": "安徽金元素复合材料有限公司",
    "ownership": "国企",
    "city": "滁州",
    "region": "安徽省",
    "salaryRange": "未知",
    "schedule": "待核对",
    "scaleOrIndustry": "爆炸复合 / 金属复合材料",
    "highlights": [
      "爆炸复合板",
      "金属复合材料",
      "南钢集团体系",
      "热轧复合板"
    ],
    "positions": "材料研发、工艺技术、生产制造、质量检测",
    "education": "待核对",
    "website": "http://www.jysah.com/",
    "links": [
      {
        "title": "安徽金元素复合材料有限公司官网",
        "type": "官网",
        "url": "http://www.jysah.com/",
        "note": "官网首页。"
      },
      {
        "title": "公司简介 - 安徽金元素",
        "type": "官网",
        "url": "http://www.jysah.com/index.php?m=home&c=Lists&a=index&tid=1",
        "note": "官网公司简介。"
      },
      {
        "title": "爆炸复合板产品页",
        "type": "官网",
        "url": "http://www.jysah.com/index.php?m=home&c=Lists&a=index&tid=5",
        "note": "爆炸复合板产品入口。"
      },
      {
        "title": "金属复合板产品页",
        "type": "官网",
        "url": "http://www.jysah.com/index.php?m=home&c=Lists&a=index&tid=4",
        "note": "金属复合板产品入口。"
      },
      {
        "title": "联系我们 - 安徽金元素",
        "type": "官网",
        "url": "http://www.jysah.com/index.php?m=home&c=Lists&a=index&tid=19",
        "note": "滁州来安汊河开发区联系方式。"
      }
    ],
    "description": "爆炸复合与金属复合材料企业。",
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "中",
      "updatedAt": "2026-07-19",
      "summary": "官网简介和产品页可对应爆炸复合板与金属复合材料主体；独立招聘入口偏弱，岗位与待遇仍需补强。",
      "verifiedFields": [
        "name",
        "website",
        "city",
        "region",
        "scaleOrIndustry"
      ],
      "pendingFields": [
        "salaryRange",
        "schedule",
        "education",
        "positions",
        "最新招聘入口"
      ]
    },
    "research": {
      "updatedAt": "2026-07-19",
      "status": "主体和爆炸复合产品方向已整理，招聘入口与待遇仍需补强。",
      "relevanceLevel": "中",
      "conclusion": "安徽金元素复合材料有限公司官网写明从事金属复合材料研发生产，并公开爆炸复合板产品入口。它更适合作为爆炸加工与复合材料近相关候选，不应写成民爆或弹药生产主体；目前独立招聘入口偏弱，岗位、学历和待遇仍需继续核对。",
      "keySignals": [
        "官网公开爆炸复合板产品栏目",
        "公司简介写明金属复合材料研发生产",
        "页面出现南钢集团体系线索",
        "联系页给出滁州来安地址"
      ],
      "suitableFor": [
        "爆炸加工与复合材料方向",
        "材料、冶金、机械相关学生",
        "关注爆炸复合板应用场景的学生"
      ],
      "risks": [
        "独立招聘入口偏弱",
        "不能抬成弹药或民爆生产主体",
        "薪资作息缺少稳定公开来源"
      ],
      "sources": [
        {
          "title": "安徽金元素复合材料有限公司官网",
          "type": "官网",
          "date": "2026-07-19",
          "url": "http://www.jysah.com/"
        },
        {
          "title": "公司简介 - 安徽金元素",
          "type": "官网",
          "date": "2026-07-19",
          "url": "http://www.jysah.com/index.php?m=home&c=Lists&a=index&tid=1"
        },
        {
          "title": "爆炸复合板产品页",
          "type": "官网",
          "date": "2026-07-19",
          "url": "http://www.jysah.com/index.php?m=home&c=Lists&a=index&tid=5"
        },
        {
          "title": "金属复合板产品页",
          "type": "官网",
          "date": "2026-07-19",
          "url": "http://www.jysah.com/index.php?m=home&c=Lists&a=index&tid=4"
        },
        {
          "title": "联系我们 - 安徽金元素",
          "type": "官网",
          "date": "2026-07-19",
          "url": "http://www.jysah.com/index.php?m=home&c=Lists&a=index&tid=19"
        }
      ],
      "searchTrace": [
        {
          "round": 1,
          "queries": [
            "安徽金元素复合材料有限公司 官网",
            "金元素 爆炸复合板",
            "南钢集团 金元素"
          ],
          "usefulFindings": [
            "官网可访问且主体一致",
            "产品页有爆炸复合板",
            "简介页写明金属复合材料业务"
          ],
          "gaps": [
            "独立招聘入口",
            "薪资作息"
          ]
        },
        {
          "round": 2,
          "queries": [
            "site:jysah.com 公司简介 爆炸复合板 联系我们",
            "安徽金元素 来安 汊河"
          ],
          "usefulFindings": [
            "联系页给出滁州来安地址",
            "产品栏目区分金属复合板和爆炸复合板"
          ],
          "gaps": [
            "岗位明细",
            "学历要求"
          ]
        }
      ]
    }
  },
  {
    "id": 76,
    "name": "北京百战奇靶场装备技术有限公司",
    "ownership": "民企",
    "city": "北京",
    "region": "北京市",
    "salaryRange": "未知",
    "schedule": "待核对",
    "scaleOrIndustry": "靶场装备 / 射击训练",
    "highlights": [
      "靶场建设",
      "实弹靶机",
      "战术靶",
      "训练装备"
    ],
    "positions": "靶场工程、装备研发、系统集成、项目实施",
    "education": "待核对",
    "website": "https://www.baizhanqi.com/",
    "links": [
      {
        "title": "北京百战奇靶场装备技术有限公司官网",
        "type": "官网",
        "url": "https://www.baizhanqi.com/",
        "note": "官网首页。"
      },
      {
        "title": "关于百战奇",
        "type": "官网",
        "url": "https://www.baizhanqi.com/about.html",
        "note": "官网关于页。"
      },
      {
        "title": "靶场装备产品页",
        "type": "官网",
        "url": "https://www.baizhanqi.com/product",
        "note": "精度靶、战术靶等产品入口。"
      },
      {
        "title": "联系我们 - 百战奇",
        "type": "官网",
        "url": "https://www.baizhanqi.com/contact.html",
        "note": "联系页含人才招聘入口线索。"
      },
      {
        "title": "靶场建设栏目",
        "type": "官网",
        "url": "https://www.baizhanqi.com/bcjs",
        "note": "靶场建设业务入口。"
      }
    ],
    "description": "靶场建设与射击训练装备企业。",
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "中",
      "updatedAt": "2026-07-19",
      "summary": "官网首页、产品页和联系页可对应靶场装备主体；独立招聘明细偏弱，不能抬成弹药生产主体。",
      "verifiedFields": [
        "name",
        "website",
        "city",
        "region",
        "scaleOrIndustry"
      ],
      "pendingFields": [
        "salaryRange",
        "schedule",
        "education",
        "positions",
        "最新招聘公告"
      ]
    },
    "research": {
      "updatedAt": "2026-07-19",
      "status": "主体和靶场装备方向已整理，招聘明细与待遇仍需补强。",
      "relevanceLevel": "中",
      "conclusion": "北京百战奇靶场装备技术有限公司官网写明从事靶场建设和射击训练装备，产品覆盖精度靶、战术靶和自动报靶系统。它更适合作为弹药使用端训练装备近相关候选，不应写成弹药或民爆生产主体；联系页有人才招聘线索，但岗位、学历和待遇仍需继续确认。",
      "keySignals": [
        "官网公开靶场建设与靶场装备业务",
        "产品页覆盖精度靶、战术靶和报靶设备",
        "联系页给出北京丰台地址",
        "页面出现人才招聘入口线索"
      ],
      "suitableFor": [
        "靶场建设与射击训练装备方向",
        "机电、自动化和系统集成背景",
        "关注弹药使用端训练场景的学生"
      ],
      "risks": [
        "不能抬成弹药或民爆生产主体",
        "独立招聘明细偏弱",
        "薪资作息缺少稳定公开来源"
      ],
      "sources": [
        {
          "title": "北京百战奇靶场装备技术有限公司官网",
          "type": "官网",
          "date": "2026-07-19",
          "url": "https://www.baizhanqi.com/"
        },
        {
          "title": "关于百战奇",
          "type": "官网",
          "date": "2026-07-19",
          "url": "https://www.baizhanqi.com/about.html"
        },
        {
          "title": "靶场装备产品页",
          "type": "官网",
          "date": "2026-07-19",
          "url": "https://www.baizhanqi.com/product"
        },
        {
          "title": "联系我们 - 百战奇",
          "type": "官网",
          "date": "2026-07-19",
          "url": "https://www.baizhanqi.com/contact.html"
        },
        {
          "title": "靶场建设栏目",
          "type": "官网",
          "date": "2026-07-19",
          "url": "https://www.baizhanqi.com/bcjs"
        }
      ],
      "searchTrace": [
        {
          "round": 1,
          "queries": [
            "北京百战奇靶场装备技术有限公司 官网",
            "百战奇 靶场建设",
            "百战奇 靶场装备"
          ],
          "usefulFindings": [
            "官网可访问且主体一致",
            "产品页覆盖靶机与报靶设备",
            "联系页可查地址电话"
          ],
          "gaps": [
            "招聘明细",
            "薪资作息"
          ]
        },
        {
          "round": 2,
          "queries": [
            "site:baizhanqi.com 关于 产品 联系我们",
            "百战奇 丰台 射击靶场"
          ],
          "usefulFindings": [
            "联系页给出丰台地址",
            "业务覆盖靶场建设与改造"
          ],
          "gaps": [
            "学历要求",
            "最新岗位"
          ]
        }
      ]
    }
  },
  {
    "id": 77,
    "name": "东莞市弘腾自动化智能科技有限公司",
    "ownership": "民企",
    "city": "东莞",
    "region": "广东省",
    "salaryRange": "未知",
    "schedule": "待核对",
    "scaleOrIndustry": "民爆自动化装备 / 火工品产线",
    "highlights": [
      "电子雷管生产线",
      "火工品自动化",
      "数码雷管元器件",
      "专精特新"
    ],
    "positions": "机械设计、电气调试、自动化设备、研发工程",
    "education": "待核对",
    "website": "https://www.htaie.com/",
    "links": [
      {
        "title": "东莞市弘腾自动化智能科技有限公司官网",
        "type": "官网",
        "url": "https://www.htaie.com/",
        "note": "官网首页。"
      },
      {
        "title": "关于我们 - 弘腾自动化",
        "type": "官网",
        "url": "https://www.htaie.com/%e5%85%b3%e4%ba%8e%e6%88%91%e4%bb%ac.html",
        "note": "官网公司简介与发展历程。"
      },
      {
        "title": "民爆行业设备 - 弘腾自动化",
        "type": "官网",
        "url": "https://www.htaie.com/category/product/scx",
        "note": "电子雷管生产线与绑定检测设备。"
      },
      {
        "title": "火工品设备 - 弘腾自动化",
        "type": "官网",
        "url": "https://www.htaie.com/category/product/%e7%81%ab%e5%b7%a5%e5%93%81%e8%ae%be%e5%a4%87/",
        "note": "火工品相关设备栏目。"
      },
      {
        "title": "联系我们 - 弘腾自动化",
        "type": "官网",
        "url": "https://www.htaie.com/%e8%81%94%e7%b3%bb%e6%88%91%e4%bb%ac.html",
        "note": "东莞虎门地址与联系方式。"
      }
    ],
    "description": "电子雷管与火工品自动化装备企业。",
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "高",
      "updatedAt": "2026-07-19",
      "summary": "官网简介、产品页和联系页可对应同一民爆与火工自动化装备主体；独立招聘明细偏弱，最新岗位与待遇仍需复核。",
      "verifiedFields": [
        "name",
        "website",
        "city",
        "region",
        "ownership",
        "scaleOrIndustry"
      ],
      "pendingFields": [
        "salaryRange",
        "schedule",
        "education",
        "最新招聘公告",
        "具体岗位明细"
      ]
    },
    "research": {
      "updatedAt": "2026-07-19",
      "status": "主体、电子雷管产线和火工品设备方向已整理，最新岗位与待遇仍需核对。",
      "relevanceLevel": "高",
      "conclusion": "东莞市弘腾自动化智能科技有限公司官网写明聚焦军工及民爆自动化装备，产品覆盖电子雷管全自动生产线和火工品相关设备。它是装备供应商，不是弹药或民爆生产主体；官网招聘入口不明显，最新岗位、学历和待遇仍需按当年渠道确认。",
      "keySignals": [
        "官网写明电子雷管全自动生产线业务",
        "产品页覆盖电子雷管绑定、检测和产线设备",
        "简介页写明专精特新和高新技术企业线索",
        "联系页给出东莞虎门地址"
      ],
      "suitableFor": [
        "民爆装备自动化方向",
        "机械、电气、自动化背景",
        "关注电子雷管产线设备的学生"
      ],
      "risks": [
        "不是民爆或弹药生产主体",
        "独立招聘明细偏弱",
        "现场调试可能涉及出差",
        "薪资作息缺少稳定公开口径"
      ],
      "sources": [
        {
          "title": "东莞市弘腾自动化智能科技有限公司官网",
          "type": "官网",
          "date": "2026-07-19",
          "url": "https://www.htaie.com/"
        },
        {
          "title": "关于我们 - 弘腾自动化",
          "type": "官网",
          "date": "2026-07-19",
          "url": "https://www.htaie.com/%e5%85%b3%e4%ba%8e%e6%88%91%e4%bb%ac.html"
        },
        {
          "title": "民爆行业设备 - 弘腾自动化",
          "type": "官网",
          "date": "2026-07-19",
          "url": "https://www.htaie.com/category/product/scx"
        },
        {
          "title": "火工品设备 - 弘腾自动化",
          "type": "官网",
          "date": "2026-07-19",
          "url": "https://www.htaie.com/category/product/%e7%81%ab%e5%b7%a5%e5%93%81%e8%ae%be%e5%a4%87/"
        },
        {
          "title": "联系我们 - 弘腾自动化",
          "type": "官网",
          "date": "2026-07-19",
          "url": "https://www.htaie.com/%e8%81%94%e7%b3%bb%e6%88%91%e4%bb%ac.html"
        }
      ],
      "searchTrace": [
        {
          "round": 1,
          "queries": [
            "东莞市弘腾自动化智能科技有限公司 官网",
            "弘腾自动化 电子雷管生产线",
            "弘腾自动化 火工品设备"
          ],
          "usefulFindings": [
            "官网可访问且主体一致",
            "简介页写明电子雷管和火工自动化方向",
            "产品页覆盖民爆行业设备"
          ],
          "gaps": [
            "独立招聘明细",
            "薪资作息"
          ]
        },
        {
          "round": 2,
          "queries": [
            "site:htaie.com 关于我们 民爆行业设备 联系我们",
            "弘腾自动化 虎门 专精特新"
          ],
          "usefulFindings": [
            "联系页给出东莞虎门地址",
            "简介页出现专精特新线索"
          ],
          "gaps": [
            "最新岗位",
            "学历要求"
          ]
        }
      ]
    }
  },
  {
    "id": 78,
    "name": "沈阳消应爆破工程有限公司",
    "ownership": "民企",
    "city": "沈阳",
    "region": "辽宁省",
    "salaryRange": "未知",
    "schedule": "待核对",
    "scaleOrIndustry": "爆破工程 / 特种爆破 / 销爆",
    "highlights": [
      "一级爆破资质",
      "拆除爆破",
      "特种爆破",
      "废旧弹药销毁"
    ],
    "positions": "爆破工程技术、施工管理、销爆作业、安全管理",
    "education": "待核对",
    "website": "https://www.syxybp.com/",
    "links": [
      {
        "title": "沈阳消应爆破工程有限公司官网",
        "type": "官网",
        "url": "https://www.syxybp.com/",
        "note": "官网首页。"
      },
      {
        "title": "消应集团介绍",
        "type": "官网",
        "url": "https://www.syxybp.com/h-col-103.html",
        "note": "集团与子公司介绍页。"
      },
      {
        "title": "精品工程 - 消应爆破",
        "type": "官网",
        "url": "https://www.syxybp.com/h-col-104.html",
        "note": "工程业绩入口。"
      },
      {
        "title": "新闻中心 - 消应爆破",
        "type": "新闻资料",
        "url": "https://www.syxybp.com/h-col-105.html",
        "note": "官网新闻与销爆动态。"
      },
      {
        "title": "专家团队 - 消应爆破",
        "type": "官网",
        "url": "https://www.syxybp.com/h-col-101.html",
        "note": "专家与技术骨干介绍。"
      },
      {
        "title": "联系我们 - 消应爆破",
        "type": "官网",
        "url": "https://www.syxybp.com/h-col-102.html",
        "note": "沈阳沈北新区联系方式。"
      }
    ],
    "description": "辽宁一级爆破与特种销爆工程企业。",
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "高",
      "updatedAt": "2026-07-19",
      "summary": "官网首页、集团介绍、工程页和新闻页可对应同一爆破工程主体；独立招聘栏目偏弱，最新岗位与待遇仍需复核。",
      "verifiedFields": [
        "name",
        "website",
        "city",
        "region",
        "ownership",
        "scaleOrIndustry"
      ],
      "pendingFields": [
        "salaryRange",
        "schedule",
        "education",
        "最新招聘公告",
        "具体岗位明细"
      ]
    },
    "research": {
      "updatedAt": "2026-07-19",
      "status": "主体、一级爆破资质、特种爆破和销爆方向已整理，最新岗位与待遇仍需核对。",
      "relevanceLevel": "高",
      "conclusion": "沈阳消应爆破持有营业性爆破作业单位一级资质，业务覆盖拆除爆破、特种爆破和废旧弹药销毁，是东北区域爆破工程强相关主体。独立招聘栏目偏弱，薪资、作息和最新岗位（待核对）。",
      "keySignals": [
        "官网写明一级爆破作业资质",
        "业务覆盖拆除爆破和特种爆破",
        "新闻页出现废旧弹药销毁线索",
        "联系页给出沈阳沈北新区地址"
      ],
      "suitableFor": [
        "爆破工程与安全工程方向",
        "关注特种爆破和销爆作业的学生",
        "倾向东北区域工程岗位的学生"
      ],
      "risks": [
        "现场爆破和销爆岗位强度高",
        "独立招聘明细偏弱",
        "工作地点可能跨区域",
        "薪资作息缺少稳定公开口径"
      ],
      "sources": [
        {
          "title": "沈阳消应爆破工程有限公司官网",
          "type": "官网",
          "date": "2026-07-19",
          "url": "https://www.syxybp.com/"
        },
        {
          "title": "消应集团介绍",
          "type": "官网",
          "date": "2026-07-19",
          "url": "https://www.syxybp.com/h-col-103.html"
        },
        {
          "title": "精品工程 - 消应爆破",
          "type": "官网",
          "date": "2026-07-19",
          "url": "https://www.syxybp.com/h-col-104.html"
        },
        {
          "title": "新闻中心 - 消应爆破",
          "type": "新闻资料",
          "date": "2026-07-19",
          "url": "https://www.syxybp.com/h-col-105.html"
        },
        {
          "title": "专家团队 - 消应爆破",
          "type": "官网",
          "date": "2026-07-19",
          "url": "https://www.syxybp.com/h-col-101.html"
        },
        {
          "title": "联系我们 - 消应爆破",
          "type": "官网",
          "date": "2026-07-19",
          "url": "https://www.syxybp.com/h-col-102.html"
        }
      ],
      "searchTrace": [
        {
          "round": 1,
          "queries": [
            "沈阳消应爆破工程有限公司 官网",
            "消应爆破 一级资质",
            "消应爆破 销爆"
          ],
          "usefulFindings": [
            "官网可访问且主体一致",
            "首页写明一级爆破资质",
            "新闻页出现销爆任务线索"
          ],
          "gaps": [
            "独立招聘明细",
            "薪资作息"
          ]
        },
        {
          "round": 2,
          "queries": [
            "site:syxybp.com 消应集团 精品工程 联系我们",
            "消应爆破 沈北新区"
          ],
          "usefulFindings": [
            "集团页列出多家子公司",
            "联系页给出沈阳地址"
          ],
          "gaps": [
            "最新岗位",
            "学历要求"
          ]
        }
      ]
    }
  },
  {
    "id": 79,
    "name": "洛阳正硕电子科技有限公司",
    "ownership": "民企",
    "city": "洛阳",
    "region": "河南省",
    "salaryRange": "未知",
    "schedule": "待核对",
    "scaleOrIndustry": "电子雷管芯片模组 / 智能起爆系统",
    "highlights": [
      "电子雷管芯片",
      "智能起爆器",
      "专精特新",
      "行业测评"
    ],
    "positions": "电子研发、嵌入式软件、测试工程、生产工艺",
    "education": "待核对",
    "website": "https://www.lyzstech.com/",
    "links": [
      {
        "title": "洛阳正硕电子科技有限公司官网",
        "type": "官网",
        "url": "https://www.lyzstech.com/",
        "note": "官网首页。"
      },
      {
        "title": "走进正硕 / 公司简介",
        "type": "官网",
        "url": "https://www.lyzstech.com/aboutus.html",
        "note": "官网公司简介。"
      },
      {
        "title": "电子雷管芯片模组产品页",
        "type": "官网",
        "url": "https://www.lyzstech.com/products/2.html",
        "note": "电子雷管芯片模组产品入口。"
      },
      {
        "title": "人才招聘 - 正硕科技",
        "type": "招聘入口",
        "url": "https://www.lyzstech.com/job.html",
        "note": "官网人才招聘栏目。"
      },
      {
        "title": "联系我们 - 正硕科技",
        "type": "官网",
        "url": "https://www.lyzstech.com/contact.html",
        "note": "洛阳老城区地址与联系方式。"
      },
      {
        "title": "智联招聘企业页线索",
        "type": "招聘入口",
        "url": "https://www.zhaopin.com/companydetail/CZ826676560.htm",
        "note": "第三方招聘平台企业页线索。"
      }
    ],
    "description": "电子雷管芯片模组与智能起爆系统企业。",
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "高",
      "updatedAt": "2026-07-19",
      "summary": "官网简介、产品页、招聘页和联系页可对应同一电子雷管芯片模组主体；最新岗位明细和待遇仍需复核。",
      "verifiedFields": [
        "name",
        "website",
        "city",
        "region",
        "ownership",
        "scaleOrIndustry"
      ],
      "pendingFields": [
        "salaryRange",
        "schedule",
        "education",
        "最新岗位明细"
      ]
    },
    "research": {
      "updatedAt": "2026-07-19",
      "status": "主体、电子雷管芯片模组和招聘入口已整理，最新岗位与待遇仍需核对。",
      "relevanceLevel": "高",
      "conclusion": "洛阳正硕从事电子雷管芯片模组及智能起爆器的设计、研发、制造与销售，设有人才招聘栏目，是电子雷管上游芯片与起爆系统强相关主体，不是完整民爆生产企业。薪资、作息和最新岗位（待核对）。",
      "keySignals": [
        "官网写明电子雷管芯片模组业务",
        "产品页公开芯片模组型号入口",
        "官网设有人才招聘栏目",
        "联系页给出洛阳老城区地址"
      ],
      "suitableFor": [
        "电子、嵌入式和自动化方向",
        "关注电子雷管芯片与起爆系统的学生",
        "倾向河南区域民爆配套企业的学生"
      ],
      "risks": [
        "不是完整民爆生产企业",
        "河南区域同方向企业已较多",
        "招聘明细和待遇仍需复核",
        "薪资作息缺少稳定公开口径"
      ],
      "sources": [
        {
          "title": "洛阳正硕电子科技有限公司官网",
          "type": "官网",
          "date": "2026-07-19",
          "url": "https://www.lyzstech.com/"
        },
        {
          "title": "走进正硕 / 公司简介",
          "type": "官网",
          "date": "2026-07-19",
          "url": "https://www.lyzstech.com/aboutus.html"
        },
        {
          "title": "电子雷管芯片模组产品页",
          "type": "官网",
          "date": "2026-07-19",
          "url": "https://www.lyzstech.com/products/2.html"
        },
        {
          "title": "人才招聘 - 正硕科技",
          "type": "招聘入口",
          "date": "2026-07-19",
          "url": "https://www.lyzstech.com/job.html"
        },
        {
          "title": "联系我们 - 正硕科技",
          "type": "官网",
          "date": "2026-07-19",
          "url": "https://www.lyzstech.com/contact.html"
        },
        {
          "title": "智联招聘企业页线索",
          "type": "招聘入口",
          "date": "2026-07-19",
          "url": "https://www.zhaopin.com/companydetail/CZ826676560.htm"
        }
      ],
      "searchTrace": [
        {
          "round": 1,
          "queries": [
            "洛阳正硕电子科技有限公司 官网",
            "正硕 电子雷管芯片模组",
            "正硕科技 招聘"
          ],
          "usefulFindings": [
            "官网可访问且主体一致",
            "简介页写明芯片模组和起爆器业务",
            "官网有人才招聘栏目"
          ],
          "gaps": [
            "最新岗位明细",
            "薪资作息"
          ]
        },
        {
          "round": 2,
          "queries": [
            "site:lyzstech.com aboutus job products contact",
            "正硕科技 老城区 古都科创园"
          ],
          "usefulFindings": [
            "产品页公开芯片模组入口",
            "联系页给出洛阳地址"
          ],
          "gaps": [
            "学历要求",
            "应届生定薪"
          ]
        }
      ]
    }
  },
  {
    "id": 80,
    "name": "吉林市宏源科学仪器有限公司",
    "ownership": "民企",
    "city": "吉林",
    "region": "吉林省",
    "salaryRange": "未知",
    "schedule": "待核对",
    "scaleOrIndustry": "爆炸测试装备 / 安全检测仪器",
    "highlights": [
      "粉尘爆炸试验",
      "爆炸极限试验",
      "抑爆测试系统",
      "危化品试验装置"
    ],
    "positions": "仪器研发、测试工程、电气控制、售后技术",
    "education": "待核对",
    "website": "http://www.hykxyq.com/",
    "links": [
      {
        "title": "吉林市宏源科学仪器有限公司官网",
        "type": "官网",
        "url": "http://www.hykxyq.com/",
        "note": "官网首页。"
      },
      {
        "title": "公司简介 - 宏源科学仪器",
        "type": "官网",
        "url": "http://www.hykxyq.com/About.html",
        "note": "官网公司简介。"
      },
      {
        "title": "产品中心 - 宏源科学仪器",
        "type": "官网",
        "url": "http://www.hykxyq.com/Product.html",
        "note": "爆炸与危化品试验装置产品入口。"
      },
      {
        "title": "联系我们 - 宏源科学仪器",
        "type": "官网",
        "url": "http://www.hykxyq.com/Contact.html",
        "note": "吉林高新区地址与联系方式。"
      }
    ],
    "description": "爆炸参数与安全检测试验装置企业。",
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "中",
      "updatedAt": "2026-07-19",
      "summary": "官网简介、产品页和联系页可对应爆炸测试装备主体；独立招聘入口偏弱，不能抬成民爆生产或爆破工程主体。",
      "verifiedFields": [
        "name",
        "website",
        "city",
        "region",
        "scaleOrIndustry"
      ],
      "pendingFields": [
        "salaryRange",
        "schedule",
        "education",
        "positions",
        "最新招聘公告"
      ]
    },
    "research": {
      "updatedAt": "2026-07-19",
      "status": "主体和爆炸测试装备方向已整理，招聘明细与待遇仍需补强。",
      "relevanceLevel": "中",
      "conclusion": "吉林市宏源科学仪器有限公司官网写明研发生产粉尘爆炸、气体爆炸、抑爆评定和危化品物理危害试验装置。它更适合作为爆炸安全检测装备近相关候选，不应写成民爆生产或爆破工程主体；独立招聘入口偏弱，岗位、学历和待遇仍需继续确认。",
      "keySignals": [
        "官网公开粉尘爆炸和爆炸极限试验装置",
        "产品页覆盖抑爆测试与危化品试验设备",
        "简介页写明科研与军工合作线索",
        "联系页给出吉林高新区地址"
      ],
      "suitableFor": [
        "爆炸安全检测与试验装备方向",
        "仪器、测控和电气自动化背景",
        "关注粉尘爆炸与抑爆测试的学生"
      ],
      "risks": [
        "不能抬成民爆生产或爆破工程主体",
        "独立招聘明细偏弱",
        "薪资作息缺少稳定公开来源"
      ],
      "sources": [
        {
          "title": "吉林市宏源科学仪器有限公司官网",
          "type": "官网",
          "date": "2026-07-19",
          "url": "http://www.hykxyq.com/"
        },
        {
          "title": "公司简介 - 宏源科学仪器",
          "type": "官网",
          "date": "2026-07-19",
          "url": "http://www.hykxyq.com/About.html"
        },
        {
          "title": "产品中心 - 宏源科学仪器",
          "type": "官网",
          "date": "2026-07-19",
          "url": "http://www.hykxyq.com/Product.html"
        },
        {
          "title": "联系我们 - 宏源科学仪器",
          "type": "官网",
          "date": "2026-07-19",
          "url": "http://www.hykxyq.com/Contact.html"
        }
      ],
      "searchTrace": [
        {
          "round": 1,
          "queries": [
            "吉林市宏源科学仪器有限公司 官网",
            "宏源科学仪器 粉尘爆炸试验",
            "宏源科学仪器 爆炸极限"
          ],
          "usefulFindings": [
            "官网可访问且主体一致",
            "产品页覆盖粉尘爆炸与抑爆设备",
            "简介页写明试验装置研发生产"
          ],
          "gaps": [
            "招聘明细",
            "薪资作息"
          ]
        },
        {
          "round": 2,
          "queries": [
            "site:hykxyq.com About Product Contact",
            "宏源科学仪器 吉林高新区"
          ],
          "usefulFindings": [
            "联系页给出吉林高新区地址",
            "产品目录覆盖爆炸测试装备"
          ],
          "gaps": [
            "学历要求",
            "最新岗位"
          ]
        }
      ]
    }
  },
]

export function getCompanyById(id: number) {
  return companies.find((company) => company.id === id)
}

