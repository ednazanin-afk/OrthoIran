import React, { useState } from 'react';

// OrthoIran — single-file React page // TailwindCSS assumed present in project. RTL + فارسی. // This component is a starting point: data placeholders, interactions (open details, read more, // calendar toggle, fasting mark), and accessible structure.

export default function OrthoIranApp() { const today = new Date(); const [calendarType, setCalendarType] = useState('جدید'); // 'جدید' | 'قدیم' const [selectedSection, setSelectedSection] = useState(null); // {type, item} const [expandedReadings, setExpandedReadings] = useState(false);

// Example data (replace with real feed / CMS later) const data = { dateLabel: today.toLocaleDateString('fa-IR', { weekday: 'long', month: 'long', day: 'numeric' }), quote: 'برای دیگران همچنان دعا کن که برای خود دعا می‌کنی، زیرا ما همه یکی هستیم، فرزندان پدر آسمانی.', quoteAuthor: 'استاد یوحنا از کرنستادت', saints: [ { id: 1, name: 'قدیسِ الف', icon: '👤', short: 'دو خط معرفی قدیس الف...', bio: 'سرگذشت کامل قدیس الف — پاراگراف‌های طولانی‌تر برای صفحه جزئیات.' }, { id: 2, name: 'قدیسِ ب', icon: '👤', short: 'دو خط معرفی قدیس ب...', bio: 'سرگذشت کامل قدیس ب.' }, ], hymn: 'متن کوتاه سرود ستایش روز — یک تا دو بند کوتاه قابل نمایش در همان صفحه.', reflection: 'دو خط اولِ تأمل روز که بلافاصله نشان داده می‌شود.', reflectionFull: 'متن کامل تأمل روز — پاراگراف‌های بیشتر، با قابلیت باز کردن صفحه کامل با «مطالعه بیشتر».', contemplation: 'دو خط اولِ تعمق.', contemplationFull: 'متن کاملِ تعمق روزی.', homily: 'دو خط از موعظه روز.', homilyFull: 'متن کامل موعظه روزی — طولانی‌تر، صفحه جداگانه.', readings: [ { id: 'ep', type: 'Epistle', label: 'رساله', ref: '1قر 15.58-16.3', content: 'متن اردو یا ترجمه آیات مورد نظر برای خواندن.' }, { id: 'gsp', type: 'Gospel', label: 'انجیل', ref: 'لوقا 5.27-32', content: 'متن آیات انجیل این روز آماده خواندن.' }, ], };

// Simple fasting rule: چهارشنبه or جمعه => show fish emoji. (Replace with calendar lookup later) function isFastingDay(date) { const day = date.getDay(); // 0 Sunday, 1 Monday, ... 3 Wednesday, 5 Friday return day === 3 || day === 5; // Wednesday or Friday }

function openItem(type, item) { setSelectedSection({ type, item }); }

function closeItem() { setSelectedSection(null); }

return ( <div dir="rtl" className="min-h-screen bg-gray-50 text-gray-900 font-sans p-4"> <header className="relative mb-4"> <div className="bg-gradient-to-b from-yellow-100 to-white rounded-xl p-6 shadow-md"> <div className="flex items-start justify-between"> <div> <h1 className="text-3xl font-extrabold">{data.dateLabel}</h1> <p className="mt-2 text-sm text-gray-700 max-w-xl">{data.quote}</p> <p className="mt-2 text-sm text-gray-600 text-right">{data.quoteAuthor}</p> </div> <div className="text-sm text-right"> <div className="mb-2">تقویم: <strong>{calendarType}</strong></div> <div className="flex gap-2"> <button onClick={() => setCalendarType('جدید')} className={px-3 py-1 rounded-lg border ${calendarType === 'جدید' ? 'bg-white shadow' : 'bg-transparent'}}> جدید </button> <button onClick={() => setCalendarType('قدیم')} className={px-3 py-1 rounded-lg border ${calendarType === 'قدیم' ? 'bg-white shadow' : 'bg-transparent'}}> قدیم </button> </div> </div> </div> {isFastingDay(today) && ( <div className="absolute left-4 top-4 text-2xl">🐟</div> )} </div> </header>

<main className="space-y-4">
    {/* Sections list */}
    <div className="grid grid-cols-1 gap-4">
      <Card title="قدیسان" onClick={() => {}}>
        <ul className="divide-y">
          {data.saints.map((s) => (
            <li key={s.id} className="py-3 flex justify-between items-center">
              <div>
                <div className="font-medium">{s.name}</div>
                <div className="text-sm text-gray-600">{s.short}</div>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => openItem('saint', s)} className="text-sm px-3 py-2 rounded-lg border">نمایش</button>
              </div>
            </li>
          ))}
        </ul>
      </Card>

      <Card title="سرود ستایش" onClick={() => openItem('hymn', { text: data.hymn })}>
        <div className="text-sm">{data.hymn}</div>
      </Card>

      <Card title="تأمل" onClick={() => openItem('reflection', { short: data.reflection, full: data.reflectionFull })}>
        <div className="text-sm">{data.reflection}</div>
        <div className="mt-2">
          <button className="text-sm underline" onClick={() => openItem('reflectionFull', { full: data.reflectionFull })}>مطالعه بیشتر</button>
        </div>
      </Card>

      <Card title="تعمق" onClick={() => openItem('contemplation', { short: data.contemplation, full: data.contemplationFull })}>
        <div className="text-sm">{data.contemplation}</div>
        <div className="mt-2">
          <button className="text-sm underline" onClick={() => openItem('contemplationFull', { full: data.contemplationFull })}>مطالعه بیشتر</button>
        </div>
      </Card>

      <Card title="موعظه" onClick={() => openItem('homily', { short: data.homily, full: data.homilyFull })}>
        <div className="text-sm">{data.homily}</div>
        <div className="mt-2">
          <button className="text-sm underline" onClick={() => openItem('homilyFull', { full: data.homilyFull })}>مطالعه بیشتر</button>
        </div>
      </Card>

      <Card title="آیات" onClick={() => setExpandedReadings(!expandedReadings)}>
        <div className="text-sm">آیات مشخص‌شده برای امروز</div>
        {expandedReadings && (
          <ul className="mt-3 divide-y">
            {data.readings.map((r) => (
              <li key={r.id} className="py-3 flex justify-between items-center">
                <div>
                  <div className="font-medium">{r.label} — {r.ref}</div>
                </div>
                <div>
                  <button className="px-3 py-2 border rounded" onClick={() => openItem('reading', r)}>خواندن</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <Card title="دعاها" onClick={() => openItem('prayers', { /* placeholder */ })}>
        <div className="text-sm">مجموعهٔ دعاهای روزانه (در آینده: قابل شخصی‌سازی).</div>
      </Card>
    </div>
  </main>

  {/* Modal / detail drawer */}
  {selectedSection && (
    <div className="fixed inset-0 bg-black/40 flex items-end md:items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full md:max-w-2xl p-6 shadow-lg">
        <div className="flex justify-between items-start">
          <h2 className="font-bold text-lg">
            {selectedSection.type === 'saint' && selectedSection.item.name}
            {selectedSection.type === 'hymn' && 'سرود ستایش'}
            {selectedSection.type === 'reflectionFull' && 'تأمل'}
            {selectedSection.type === 'contemplationFull' && 'تعمق'}
            {selectedSection.type === 'homilyFull' && 'موعظه'}
            {selectedSection.type === 'reading' && `${selectedSection.item.label} — ${selectedSection.item.ref}`}
            {selectedSection.type === 'prayers' && 'دعاها'}
          </h2>
          <button onClick={closeItem} className="text-sm px-3 py-1 border rounded">بستن</button>
        </div>

        <div className="mt-4 text-sm text-gray-700">
          {selectedSection.type === 'saint' && (
            <div>
              <div className="text-6xl mb-4">{selectedSection.item.icon}</div>
              <p className="mb-3">{selectedSection.item.bio}</p>
            </div>
          )}

          {selectedSection.type === 'hymn' && <p>{selectedSection.item.text}</p>}

          {selectedSection.type === 'reflectionFull' && <p>{selectedSection.item.full}</p>}

          {selectedSection.type === 'contemplationFull' && <p>{selectedSection.item.full}</p>}

          {selectedSection.type === 'homilyFull' && <p>{selectedSection.item.full}</p>}

          {selectedSection.type === 'reading' && <pre className="whitespace-pre-wrap">{selectedSection.item.content}</pre>}

          {selectedSection.type === 'prayers' && <p>لیست دعاها در این بخش قرار می‌گیرد.</p>}
        </div>
      </div>
    </div>
  )}

  <footer className="mt-8 text-center text-xs text-gray-500">OrthoIran — نسخه آزمایشی (فارسی)</footer>
</div>

); }

function Card({ title, children, onClick }) { return ( <div className="bg-white rounded-xl shadow p-4"> <div className="flex justify-between items-center mb-2"> <h3 className="font-semibold">{title}</h3> {/* chevron could go here */} </div> <div>{children}</div> </div> ); }

