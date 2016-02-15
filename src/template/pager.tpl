<ul class="pager">
    <li class="previous <% if(currentPage <= 1){ %> disabled <% } %>">
        <a href="#">上一页</a>
    </li>
    <li>
        <select class="page-jumper">
            <% for(var i=1; i<=pageCount; i++ ){ %>
            <option value="<%= i %>" <%if (currentPage == i) { %>selected="selected"<% } %>>第<%= i %>页</option>
            <% } %>
        </select>
    </li>
    <li class="next <% if(currentPage >= pageCount){ %> disabled <% } %>">
        <a href="#">下一页</a>
    </li>
</ul>