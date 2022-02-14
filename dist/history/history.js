"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHistoryModule = void 0;
const history_types_1 = require("./history.types");
const handleHistoryError_1 = require("./errors/handleHistoryError");
const validator_1 = require("../core/validator");
exports.createHistoryModule = (client) => ({
    fetchAll(filter = {}, pagination) {
        return __awaiter(this, void 0, void 0, function* () {
            validateFilteredExtension(filter);
            const historyFilterDTO = {
                archived: filter.archived,
                connectionIds: filter.connectionIds,
                directions: filter.directions,
                from: filter.startDate,
                starred: filter.starred,
                to: filter.endDate,
                types: filter.types,
            };
            return client
                .get('/history', {
                params: Object.assign(Object.assign({}, historyFilterDTO), pagination),
            })
                .then((response) => response.items.map(transformHistoryEntry))
                .catch((error) => Promise.reject(handleHistoryError_1.handleHistoryError(error)));
        });
    },
    fetchById(entryId) {
        return client
            .get(`/history/${entryId}`)
            .catch((error) => Promise.reject(handleHistoryError_1.handleHistoryError(error)));
    },
    deleteById(entryId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield client
                .delete(`/history/${entryId}`)
                .catch((error) => Promise.reject(handleHistoryError_1.handleHistoryError(error)));
        });
    },
    deleteByListOfIds(entryIds) {
        return __awaiter(this, void 0, void 0, function* () {
            yield client
                .delete(`/history`, {
                params: {
                    id: entryIds,
                },
            })
                .catch((error) => Promise.reject(handleHistoryError_1.handleHistoryError(error)));
        });
    },
    batchUpdateEvents(events, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const mappedEvents = events.map((event) => {
                return Object.assign({ id: event.id }, callback(event));
            });
            const eventsToModify = mappedEvents.filter((eventUpdate) => Object.keys(eventUpdate).length > 1);
            const eventsWithNote = [];
            const eventsWithoutNote = [];
            eventsToModify.forEach((event) => {
                if (event.note === undefined) {
                    eventsWithoutNote.push(event);
                }
                else {
                    eventsWithNote.push(event);
                }
            });
            yield Promise.all([
                ...eventsWithNote.map((event) => client.put(`history/${event.id}`, Object.assign(Object.assign({}, event), { id: undefined }))),
                client.put('history', eventsWithoutNote),
            ]).catch((error) => Promise.reject(handleHistoryError_1.handleHistoryError(error)));
        });
    },
    exportAsCsvString(filter = {}, pagination) {
        return __awaiter(this, void 0, void 0, function* () {
            validateFilteredExtension(filter);
            const historyFilterDTO = {
                archived: filter.archived,
                connectionIds: filter.connectionIds,
                directions: filter.directions,
                from: filter.startDate,
                starred: filter.starred,
                to: filter.endDate,
                types: filter.types,
            };
            return client
                .get('/history/export', {
                params: Object.assign(Object.assign({}, historyFilterDTO), pagination),
            })
                .catch((error) => Promise.reject(handleHistoryError_1.handleHistoryError(error)));
        });
    },
});
const validateFilteredExtension = (filter) => {
    if (filter && filter.connectionIds) {
        const result = filter.connectionIds
            .map((id) => validator_1.validateExtension(id))
            .find((validationResult) => validationResult.isValid === false);
        if (result && result.isValid === false) {
            throw new Error(result.cause);
        }
    }
};
const transformHistoryEntry = (entry) => {
    if (entry.type === history_types_1.HistoryEntryType.FAX) {
        const { faxStatusType } = entry, rest = __rest(entry, ["faxStatusType"]);
        return Object.assign(Object.assign({}, rest), { faxStatus: faxStatusType });
    }
    return entry;
};
//# sourceMappingURL=history.js.map