;(function (window, duration) {
    async function loadPapa() {
      const url = 'https://unpkg.com/papaparse@5.4.1/papaparse.min.js'
      return new Promise((resolve, reject) => {
        if (!window.Papa) {
          const script = document.createElement('script')
          script.src = url
          script.onload = () => resolve(window.Papa)
          script.onerror = () => reject(new Error('Failed to load script'))
          document.head.appendChild(script)
        }
        if (window.Papa) {
          resolve(window.Papa)
        }
      })
    }
  
    async function loadCSV() {
      let resolve
      const promise = new Promise(r => (resolve = r))
  
      const el = document.createElement('input')
      el.type = 'file'
  
      el.addEventListener('change', e => {
        document.body.removeChild(el)
        const file = e.target.files[0]
        if (!file) {
          resolve('')
          return
        }
        const reader = new FileReader()
        reader.addEventListener('load', e => {
          const text = e.target.result
          resolve(text)
        })
        reader.addEventListener('error', e => {
          console.error(e)
          resolve('')
        })
        reader.readAsText(file)
      })
  
      document.body.appendChild(el)
      el.click()
  
      return promise
    }
  
    function saveCSV(text) {
      const el = document.createElement('a')
      el.download = 'result.csv'
      el.href = `data:text/csv;charset=utf-8,${encodeURIComponent(text)}`
      el.click()
    }
  
    function getEmails(csvData) {
      const results = []
      if (!Array.isArray(csvData)) return results
  
      csvData.forEach(item => {
        const email = (item.email || item.Email || '').trim()
        if (email && results.indexOf(email) === -1) {
          results.push(email)
        }
      })
  
      return results
    }
  
    function pathify(n) {
      return (n + "").trim().toLowerCase().replace(/ /g, "-").replace(/\/{2,}/g, "/")
    }

    // 定义base64url字符表
    const b64u = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";

    // base64_encode_data函数
    function base64_encode_data(n, t, i) {
        for (var u = "", r = 0; r <= t - 3; r += 3)
            u += i.charAt(n.charCodeAt(r) >>> 2),
            u += i.charAt((n.charCodeAt(r) & 3) << 4 | n.charCodeAt(r + 1) >>> 4),
            u += i.charAt((n.charCodeAt(r + 1) & 15) << 2 | n.charCodeAt(r + 2) >>> 6),
            u += i.charAt(n.charCodeAt(r + 2) & 63);
        return t % 3 == 2 ? (u += i.charAt(n.charCodeAt(r) >>> 2),
        u += i.charAt((n.charCodeAt(r) & 3) << 4 | n.charCodeAt(r + 1) >>> 4),
        u += i.charAt((n.charCodeAt(r + 1) & 15) << 2),
        u += "1") : t % 3 == 1 ? (u += i.charAt(n.charCodeAt(r) >>> 2),
        u += i.charAt((n.charCodeAt(r) & 3) << 4),
        u += "2") : u += "0",
        u
    }
  
    function base64url_encode(n) {
      var t = unescape(encodeURIComponent(n));
      return base64_encode_data(t, t.length, b64u)
    }
  
    function getResultUrl(email) {
      var n = { value: email },
        r = (n.value + '').replace(/-/gi, '~').replace(/\./gi, '-'),
        g = r.includes('@'),
        i = r != undefined && r.length > 0 && g
      g &&
        ((h = r.substring(r.indexOf('@') + 1).toLowerCase()),
        (c = r.substring(0, r.indexOf('@'))),
        h == undefined || h.length == 0 ? (i = !1) : (c == undefined || c.length == 0) && (i = !1),
        (r = pathify(c) + '/' + base64url_encode(h)))
      // i ? (t != undefined && t.loading(), (window.location = pathify(_g.p[_g.t]) + r)) : showError(n, 'input_email_error')
      return pathify('/email/') + r
    }
  
    async function search(email, duration) {
      const url = location.origin + getResultUrl(email);
      console.log(url)
      return fetch(url)
        .then(resp => resp.text())
        .then(html => {
          const div = document.createElement('div')
          div.innerHTML = html
          if (html.includes('Deceased') || html.includes('deceased') ) {
            throw new Error('html Deceased');
          }
          return [...div.querySelectorAll('.btn.btn-continue')]
        })
        .then(async list => {
          const results = []
          if (!list?.length) return [];
          for (let i = 0; i < list.length; ++i) {
            let node = list[i];
            let urlDetail = node?.getAttribute?.('href');
            console.log(urlDetail);
            if (urlDetail) {
              await sleep(getDuration(duration));
              try {
                const detail = await search2(urlDetail);
                if (detail) results.push(detail);
              } catch(e) {
                console.log(e)
              }
            }
          }
          console.log('************', results);
          return results;
        })
    }

    function trimField(obj, field) {
      if (typeof obj?.[field] == 'string') {
        obj[field] = obj[field].replace(/\n/g, '');
        obj[field] = obj[field].replace(/\t/g, '');
        obj[field] = obj[field].trim();
      }
    }
    async function search2(url) {
      return fetch(url)
        .then(resp => resp.text())
        .then(html => {
          const div = document.createElement('div')
          div.innerHTML = html
          return [...div.querySelectorAll('.toc.hide-done article.background')]
        })
        .then(list => {
          let results = null;
          if (!list?.length) return results;
          let curBg = list[0].querySelector('.current-bg');
          if (!curBg) return results;
          let col = curBg.querySelector('.col-md-6');
          if (!col) return results;
          let item = {};
          item.birthday = col?.querySelector('i.text-muted')?.innerText?.trim();
          if (col?.querySelector('.text-danger')) {
            return results;
          }
          item.name = col?.querySelector('header')?.innerText?.trim();
          let age = 0;
          let phone = '';
          col.childNodes.forEach(i => {
            if (i.nodeType == 3) {
              if (i?.textContent?.toLowerCase()?.includes('age')) {
                age = i.textContent.match(/\d+/g)[0]
              }
            } else {
              if (i?.textContent?.toLowerCase()?.includes('phone')) {
                phone = i.querySelector('a')?.innerText || '';
              }
            }
          });
          item.age = age;
          item.address = col?.querySelector('.r.d-ib')?.innerText?.trim();
          console.log(item.address)
          trimField(item, 'address');
          item.phone = phone.trim();
          results = (item);
          return results;
        })
    }
  
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
    const getDuration = (duration) => {
      const rand = (Math.floor(Math.random() * 7) + 1) * 1000;
      return rand + duration;
    }

    async function main(duration = 10000) {
      await loadPapa()
  
      const csvText = await loadCSV()
      if (!csvText) return
  
      const csvData = Papa.parse(csvText, { header: true }).data
      const emails = getEmails(csvData)
  
      const outData = []
      const caches = JSON.parse(localStorage.getItem('caches-v2') || '{}')
  
      for (let i = 0; i < emails.length; i++) {
        const email = emails[i]
        console.log(`${i + 1}/${emails.length} ${email}`)
        let result = caches[email]
        if (!result?.length) {
          await sleep(getDuration(duration));
          try {
            result = await search(email, duration)
            caches[email] = result
            localStorage.setItem('caches-v2', JSON.stringify(caches))
          } catch (err) {
            console.error(err)
          }
        }
  
        if (result?.length) {
          result.forEach(item => {
            trimField(item, 'address')
            if (!item.phone && !item.age) return
            outData.push({ email, name: item.name, address: item.address, phone: item.phone, age: item.age, birthday: item.birthday })
          })
        }
      }
  
      console.log(`%c current parse total ${outData.length} datas`, 'color:green; background: lightgreen;')
      saveCSV(Papa.unparse(outData))
    }
  
    window._crawIdentity = main
    window._crawIdentity(duration)
  })(window)
  