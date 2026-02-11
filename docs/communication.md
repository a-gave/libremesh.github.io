# Communication

## Mailing Lists

The project communicate on the following mailing list

* [libremesh at krutt.org](https://www.autistici.org/mailman/listinfo/libremesh) -
  This list is used for project organisational purposes, user support, and development discussions. Any language is welcome.

You can see the [mailing list archive here](https://lists.autistici.org/list/libremesh.html) and search in it using this form:

<form id="mailing_list_search" action="https://lists.autistici.org/cgi-lurker/keyword.cgi" accept-charset="UTF-8" onsubmit="form_timezone(this)">
<input type="hidden" name="doc-url" value="https://lists.autistici.org">
<input type="hidden" name="format" value="en.html">
<input type="hidden" name="list" value="libremesh">
<table>
  <tbody>
<tr><td colspan="2">
  <input type="text" name="query" class="longtext">
  <input type="submit" name="submit" value="Search!" style="padding: 0 1em">
</td></tr>
<tr><td><b>Subject</b></td><td><input type="text" name="subject" class="longtext"></td></tr>
<tr><td><b>Author</b></td><td><input type="text" name="author" class="longtext"></td></tr>
<tr>
  <td><b>Date</b></td>
  <td>
    <input type="hidden" name="utc" value="0">
    <input type="hidden" name="sec" value="00">
    <input type="hidden" name="min" value="00">
    <input type="hidden" name="hour" value="0">
    <select name="mday">
      <option v-for="opt in 31" :value="opt" :selected="opt == 31">{{ opt }}</option>
    </select>
    &nbsp;
    <select name="mon">
      <option value="1">January</option>
      <option value="2">February</option>
      <option value="3">March</option>
      <option value="4">April</option>
      <option value="5">May</option>
      <option value="6">June</option>
      <option value="7">July</option>
      <option value="8">August</option>
      <option value="9">September</option>
      <option value="10">October</option>
      <option value="11">November</option>
      <option value="12" selected="">December</option>
    </select>
    &nbsp;
    <select name="year">
      <option value="2022">2022</option>
      <option value="2023">2023</option>
      <option value="2024">2024</option>
      <option value="2025">2025</option>
      <option value="2026" selected>2026</option>
      <option value="2027">2027</option>
    </select>
  </td>
</tr>
</tbody></table></form>

Old mailing list archives can be consulted at: 

* lime-dev https://listas.altermundi.net/archives/list/lime-dev@lists.libremesh.org/latest
* lime-users https://listas.altermundi.net/archives/list/lime-users@lists.libremesh.org/latest

## Matrix Chatroom

The chatroom can be accessed through a Matrix client like **Element** desktop software or the mobile-app and entering the `#libremesh-dev:matrix.guifi.net` chatroom. You'll need to register a user on any of the Matrix nodes (the default on element.io will also work).

## Social networks

The LibreMesh project has official accounts on
- Mastodon [@libremesh@social.freifunk.net](https://social.freifunk.net/@libremesh).
- PeerTube [@libremesh@media.exo.cat](https://media.exo.cat/@libremesh).

## Online meetings

See the [meetings reports](/meetings/index)

We decided to meet the "first Friday of the month, every two months", with additional meetings in weekdays, so:

* Friday the 2nd of January 2026 at 13:00 UTC (14:00 CET, 10:00 ART).
* Friday the 6th of February 2026 at 13:00 UTC (14:00 CET, 10:00 ART).
* **Saturday** the 7th of March 2026 at 13:00 UTC (14:00 CET, 10:00 ART).
* Friday the 3th of April 2026 at 13:00 UTC (15:00 CEST, 10:00 ART).
* Friday the 5th of June 2026 at 13:00 UTC (15:00 CEST, 10:00 ART).
* Friday the 7th of August 2026 at 13:00 UTC (15:00 CEST, 10:00 ART).
* **Saturday** the 5th of September 2026 at 13:00 UTC (15:00 CEST, 10:00 ART).
* Friday the 2nd of October 2026 at 13:00 UTC (15:00 CEST, 10:00 ART).
* Friday the 4th of December 2026 at 13:00 UTC (14:00 CET, 10:00 ART).

You can freely partecipate as listener, but.. the link of the meeting pass in chat and via mailinglist just at the end of the month before.

You can also add topics at the meeting, but we prefer to be informed before they are presented.

During the meetings we use this format:

* we prefer have a list of the topics to discuss before the meeting,
* we do report for the people that can't be present in the assembly,
* we use a pad for a collaborative reporting of discussion and decisions,
* we take the time of the speakers to not have unique long speeches
* we decide at the begin of every meeting the languages that we use, so sometimes our assembly are in different languages because people understand more than what they speak (italoportish) and sometimes we use english.
* we not decide for majority and for do-cracy, we try to reach consensus and we are friendly in the conversations, but to be honest we are not already established a written "decision making workflow".


<style>
  #mailing_list_search input {
    outline: 2px solid #dcdcdc;
  }
</style>
